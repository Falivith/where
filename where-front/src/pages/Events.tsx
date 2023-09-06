import Header from '../components/Header';
import styles from './Events.module.css';
import gustavolima from '../assets/gustavolima.png';
import moa from '../assets/MOA.jpg';
import oktober from '../assets/oktober.jpg';
import opiniao from '../assets/opiniao.png';
import rodeio from '../assets/rodeio.jpg';
import tributo from '../assets/tributo_party.jpg';
import { Link } from 'react-router-dom';

const eventosMocados = [
  {
    id: 1,
    img: gustavolima
  },
  {
    id: 2,
    img: moa
  },
  {
    id: 3,
    img: oktober
  },
  {
    id: 4,
    img: opiniao
  },
  {
    id: 5,
    img: rodeio
  },
  {
    id: 6,
    img: tributo
  },
];

function Events() {
  return (
    <>
      <Header toMap = { true } />
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {eventosMocados.map(event => (
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
