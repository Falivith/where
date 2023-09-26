/* eslint-disable */
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
import { useState } from 'react';
import Modal from './Modal';

function EventVision() {

    const [confirmado, setConfirmado] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [formData, setFormData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const params = useParams();
    const id = params.index;
    
    const alterarConfirmacao = () => {
        setConfirmado(!confirmado);
    };

    if (id === undefined) {
        return <div>Carregando...</div>;
    }

    let eventoCorrespondente = EventosMocados.find(evento => evento.id === Number(id));

    if (eventoCorrespondente === undefined) {
        eventoCorrespondente = EventosMocados.find(evento => evento.id === 16);
    }

    console.log(eventoCorrespondente);
    

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
    
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className = { stylesLembrete.description }>Para quanto tempo antes do evento você deseja configurar o lembrete? </h2>
                <div className = { stylesLembrete.bottomContainer }>
                    <button className = { stylesLembrete.confirmButton }>Confirmar</button>
                    <input type="time" />
                    <button onClick = {closeModal} className = { stylesLembrete.cancelButton }>Cancelar</button>
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
                        <img className={styles.eventBanner} src={eventoCorrespondente.img} alt="Banner do evento" />
                    </div>
                    <div className={styles.microInfoContainer}>
                        <span className={styles.microInfo}> <img src={pinpoint_icon} /> {eventoCorrespondente.address} </span>
                        <span className={styles.microInfo}> <img src={calendar_icon} /> {eventoCorrespondente.date} </span>
                        <span className={styles.microInfo}> <img src={clock_icon} /> {eventoCorrespondente.hour} </span>
                        <span className={styles.microInfo}> <img src={people_icon} /> {eventoCorrespondente.numberParticipants} </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventVision
