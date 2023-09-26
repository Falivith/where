import { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from './Events.module.css';
import { Link } from 'react-router-dom';
import EventosMocados from '../assets/EventosMocados';
import PlusSymbol from '../assets/plusSymbol.png';
import { promoterChecker } from '../services/promoter';

function Events() {
  const [isPromoter, setIsPromoter] = useState(false);

  useEffect(() => {
    promoterChecker().then((result) => {
      setIsPromoter(result);
    });
  }, []);

  return (
    <>
      <Header toMap={true} />
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {EventosMocados.map((event: { id: number; img: string }) => (
            <Link key={event.id} to={`/evento/${event.id}`} className={styles.gridItem}>
              <img src={event.img} alt={`Evento ${event.id}`} />
            </Link>
          ))}
          {/* Mostrar o Link para eventoForm apenas se isPromoter for true */}
          {isPromoter && (
            <Link to="/eventoForm/" className={styles.gridItemAdd}>
              <img src={PlusSymbol} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Events;
