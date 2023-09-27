/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from './EventVision.module.css';
import stylesLembrete from './StylesLembrete.module.css';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import pinpoint_icon from '../assets/pinpoint_icon.png';
import calendar_icon from '../assets/calendar_icon.png';
import clock_icon from '../assets/clock_icon.png';
import people_icon from '../assets/people_icon.png';
import EventosMocados from '../assets/EventosMocados';
import { Link, useParams } from 'react-router-dom';
import Modal from './Modal';
import { getOneEvent, confirmarParticipacao } from '../services/event';

function horaParte(horario: any) {
    const partes = horario.split('T');
    const final = partes[1].split('.000Z');
    return final[0];
}

function EventVision() {
    const [confirmado, setConfirmado] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [formData, setFormData] = useState({});
    const [actualEvent, setEvent] = useState({});
    const [imgUrl, setUrl] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const params = useParams();
    const id = params.index;
    
    const alterarConfirmacao = async () => {
        try {
            const response = await confirmarParticipacao(actualEvent.codEvento, true);

            console.log(response);
            
            setConfirmado(!confirmado);
        } catch (error) {
            console.error('Erro ao confirmar participação:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOneEvent(id);
                console.log(response);
                setEvent(response);
    
                // Gere a URL somente quando a resposta estiver pronta
                const uint8Array = new Uint8Array(response.foto.buffer.data);
                const blob = new Blob([uint8Array], { type: "application/octet-stream" }); // Use um MIME type apropriado
                const url = URL.createObjectURL(blob);
                setUrl(url);
    
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar evento:', error);
            }
        };
    
        if (id !== undefined) {
            fetchData();
        }
    }, [id]);

    const handleRatingChange = (newValue: any) => {
        setUserRating(newValue);
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // Aqui você pode criar um objeto com todos os dados relevantes, incluindo a avaliação do usuário
        const dataToSend = {
            rating: userRating,
            // Adicione outros campos do formulário, se houver
        };
        // Agora você pode enviar 'dataToSend' para o servidor ou realizar outra ação necessária
        setFormData(dataToSend); // Isso é opcional, apenas para visualização
    };

    // Renderiza uma mensagem de carregamento enquanto isLoading for true
    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className={stylesLembrete.description}>Para quanto tempo antes do evento você deseja configurar o lembrete? </h2>
                <div className={stylesLembrete.bottomContainer}>
                    <button className={stylesLembrete.confirmButton}>Confirmar</button>
                    <input type="time" />
                    <button onClick={closeModal} className={stylesLembrete.cancelButton}>Cancelar</button>
                </div>
            </Modal>

            <Header toMap={false} />
            <div className={styles.eventVisionContainer}>
                <div className={styles.userEvaluationContainer}>
                    <div className={styles.evaluation}>
                        <Rating
                            name="rating"
                            value={userRating} // Use o estado userRating para exibir a avaliação do usuário
                            precision={0.1}
                            size="large"
                            onChange={(event, newValue) => handleRatingChange(newValue)} // Atualize a avaliação do usuário quando ela mudar
                            icon={<StarIcon style={{ color: '#2ECA45', fontSize: '4rem' }} />}
                            emptyIcon={<StarIcon style={{ color: 'grey', fontSize: '4rem' }} />}
                        />
                    </div>

                    {!confirmado ? (
                        <button className={styles.confirmButton} onClick={alterarConfirmacao}>
                            CONFIRMAR
                        </button>
                    ) : (
                        <>
                            <button className={styles.cancelButton} onClick={alterarConfirmacao}> CANCELAR </button>
                            <Link key={id} to={`/evento/${id}/classify`} className={styles.evalueButton}>AVALIAR EVENTO</Link>
                        </>
                    )}

                    <button onClick={openModal} className={styles.defineLembrete}>DEFINIR LEMBRETE</button>
                </div>

                <div className={styles.eventInfoContianer}>
                    <div className={styles.eventBannerContainer}>
                        <img className={styles.eventBanner} src={imgUrl} alt="Banner do evento" />
                    </div>
                    <div className={styles.microInfoContainer}>
                        <span className={styles.microInfo}> <img src={pinpoint_icon} /> {actualEvent.endereco} </span>
                        <span className={styles.microInfo}> <img src={calendar_icon} /> {actualEvent.inicio} </span>
                        <span className={styles.microInfo}> <img src={clock_icon} /> {horaParte(actualEvent.horario)} </span>
                        <span className={styles.microInfo}> <img src={people_icon} /> {500} </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventVision;
