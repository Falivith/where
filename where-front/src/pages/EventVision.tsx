import Header from '../components/Header';
import styles from './EventVision.module.css';
import { Rating } from '@mui/material';

function EventVision() {

  return (
    <>
        <Header toMap = { false } />
        <div className = { styles.eventVisionContainer }>
            <div>
                <div className = { styles.evaluation }> <Rating type = {'large'}/></div>
                <button className = { styles.confirmButton }>CONFIRMAR</button>
                <button className = { styles.defineLembrete }>DEFINIR LEMBRETE</button>
            </div>
            <div>
                <div>
                    <img src = { styles.eventBanner }/>
                </div>
                <div>
                    <span className = { styles.localidade }> Parque Tecnologico de Pelotas </span>
                    <span className = { styles.date }> 20/08/2023 </span>
                    <span className = { styles.hour }> 22:55 </span>
                    <span className = { styles.interestCount }> 45 </span>
                </div>
            </div>
        </div>
    </>
  )
}

export default EventVision
