import Header from '../components/Header';
import styles from './Events.module.css';
import { Link } from 'react-router-dom';
import EventosMocados from '../assets/EventosMocados';

function Events() {
  return (
    <>
      <Header toMap = { true } />
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {EventosMocados.map((event: { id: number; img: string }) => (
            <Link key={event.id} to={`/evento/${event.id}`} className={styles.gridItem}>
              <img src={event.img} alt={`Evento ${event.id}`} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
