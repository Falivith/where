/* eslint-disable */
import Header from '../components/Header';
import styles from './ClassifyEvent.module.css';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EventosMocados from '../assets/EventosMocados';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function ClassifyEvent() {

    const [userRating, setUserRating] = useState(0);

    const params = useParams();
    const id = params.id;

    const eventoCorrespondente = EventosMocados.find(evento => evento.id === Number(id));
    console.log(id, eventoCorrespondente);
    

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
      };
    

    return (
        <>
            <Header toMap={false} />
            <div className={styles.eventVisionContainer}>

                <div className={styles.eventBannerContainer}>
                    <img className={styles.eventBanner} src={eventoCorrespondente.img} alt="Banner do evento" />
                </div>

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
                </div>

                <div className = { styles.bottomForm }>
                      <input type="text" className = { styles.inputUser } />
                      <button type='submit' className = { styles.confirmButton }>Confirmar</button>
                </div>
              

            </div>
        </>
    )
}

export default ClassifyEvent
