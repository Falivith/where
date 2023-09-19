import Header from '../components/Header';
import styles from './EventVision.module.css';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import opiniao from '../assets/opiniao.png';
import pinpoint_icon from '../assets/pinpoint_icon.png';
import calendar_icon from '../assets/calendar_icon.png';
import clock_icon from '../assets/clock_icon.png';
import people_icon from '../assets/people_icon.png';
import EventosMocados from '../assets/EventosMocados';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

function EventVision() {

    const [confirmado, setConfirmado] = useState(false);
    const params = useParams();
    const id = params.index;
    
    const alterarConfirmacao = () => {
        setConfirmado(!confirmado);
    };

    if (id === undefined) {
        return <div>Carregando...</div>;
    }

    const eventoCorrespondente = EventosMocados.find(evento => evento.id === Number(id));
    if (!eventoCorrespondente) {
        return <div>Evento não encontrado</div>;
    }

    return (
        <>
            <Header toMap={false} />
            <div className={styles.eventVisionContainer}>
                <div className={styles.userEvaluationContainer}>
                    <div className={styles.evaluation}>
                        <Rating
                            name="rating"
                            value={1}
                            precision={0.1}
                            size="large"
                            icon={<StarIcon style={{ color: '#34A853', fontSize: '4rem' }} />}
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
                            <Link to = {"./"} className={styles.evalueButton} > AVALIAR EVENTO </Link>
                        </>
                    )}

                    <button className={styles.defineLembrete}>DEFINIR LEMBRETE</button>
                </div>

                <div className={styles.eventInfoContianer}>
                    <div className={styles.eventBannerContainer}>
                        <img className={styles.eventBanner} src={opiniao} alt="Banner do evento" />
                    </div>

                    <div className={styles.microInfoContainer}>
                        <span className={styles.microInfo}> <img src={pinpoint_icon} /> Parque Tecnológico de Pelotas </span>
                        <span className={styles.microInfo}> <img src={calendar_icon} /> 20/08/2023 </span>
                        <span className={styles.microInfo}> <img src={clock_icon} /> 22:55 </span>
                        <span className={styles.microInfo}> <img src={people_icon} /> 45 </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventVision
