import { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from './Events.module.css';
import { Link } from 'react-router-dom';
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

          {events.map((event: {
            codEvento: number;
            foto: {
              buffer: {
                data: number[]; // This should be the type of your data array
              };
            };
          }) => {
            
            const uint8Array = new Uint8Array(event.foto.buffer.data);
            const blob = new Blob([uint8Array], { type: "application/octet-stream" }); // Use an appropriate MIME type
            const url = URL.createObjectURL(blob);

            return (
              <Link key={event.codEvento} to={`/evento/${event.codEvento}`} className={styles.gridItem}>
                {event.foto && event.foto.buffer && (
                  <img
                    src={url}
                    alt={`Evento ${event.codEvento}`}
                  />
                )}
              </Link>
            );
          })}

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
