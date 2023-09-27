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
  const [showEventsStartingWithB, setShowEventsStartingWithB] = useState(false); // Estado para alternar entre mostrar todos e mostrar eventos com nomes começando com "B"

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

  // Função para filtrar eventos com base em uma condição
  const filterEvents = (condition) => {
    const filtered = events.filter((event) => condition(event));
    return filtered;
  };

  // Renderização condicional com base no estado de showEventsStartingWithB
  const filteredEvents = showEventsStartingWithB
    ? filterEvents((event) => event.nome && event.isCreator)
    : events;

  // Função para alternar entre mostrar todos e mostrar eventos com nomes começando com "B"
  const toggleShowEventsStartingWithB = () => {
    setShowEventsStartingWithB((prevState) => !prevState);
  };

  // Renderização condicional com base no estado de isPromoter
  const renderAddEventLink = () => {
    if (isPromoter) {
      return (
        <Link to="/eventoForm/" className={styles.gridItemAdd}>
          <img src={PlusSymbol} alt="Adicionar Evento" />
        </Link>
      );
    }
    return null; // Não renderiza o link se não for um promotor
  };

  return (
    <>
      <Header toMap={true} />

      <label className = {styles.label}>
        Meus Eventos
        <input
          type="checkbox"
          checked={showEventsStartingWithB}
          onChange={toggleShowEventsStartingWithB}
          className={styles.checkbox}
        />
      </label>

      <div className={styles.gridContainer}>
        <div className={styles.grid}>

          {filteredEvents.map((event) => {
            const uint8Array = new Uint8Array(event.foto.buffer.data);
            const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            return (
              <Link key={event.codEvento} to={`/evento/${event.codEvento}`} className={styles.gridItem}>
                {event.foto && event.foto.buffer && <img src={url} alt={`Evento ${event.codEvento}`} />}
              </Link>
            );
          })}

          {renderAddEventLink()}
        </div>
      </div>
    </>
  );
}

export default Events;
