import { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from './Events.module.css';
import { Link } from 'react-router-dom';
import EventosMocados from '../assets/EventosMocados';
import PlusSymbol from '../assets/plusSymbol.png';
import { promoterChecker } from '../services/promoter';
import { getEvents } from '../services/event';

function Events() {
  const [isPromoter, setIsPromoter] = useState(false);

  const [events, setEvents] = useState([]);

  useEffect(() => {
      // Função para buscar eventos
      async function fetchEvents() {
        try {
          const response = await getEvents();
          setEvents(response); // Define o estado com os eventos obtidos
          console.log(response); // Imprime o resultado no console
        } catch (error) {
          console.error('Erro ao buscar eventos:', error);
        }
      }

      fetchEvents(); // Chama a função de busca de eventos ao montar o componente
    }, []);

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

          {events.map((event: { codEvento: number; img: string }) => (
            <Link key={event.codEvento} to={`/evento/${event.codEvento}`} className={styles.gridItem}>
              <img src={event.img} alt={`Evento ${event.id}`} />
            </Link>
          ))}

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
