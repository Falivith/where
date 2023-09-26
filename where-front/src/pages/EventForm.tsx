/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from './EventForm.module.css';
import pinpoint_icon from '../assets/pinpoint_icon.png';
import calendar_icon from '../assets/calendar_icon.png';
import clock_icon from '../assets/clock_icon.png';
import person_icon from '../assets/person_icon.png';
import PlusSymbol from '../assets/plusSymbol.png';
import Map from '../components/Places';

function EventForm() {
  const [backgroundImage, setBackgroundImage] = useState('none');
  const [eventTime, setEventTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocal, setEventLocal] = useState(null);
  const [eventName, setEventName] = useState('');

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(`url(${imageUrl})`);
    } else {
      setBackgroundImage('none');
    }
  };

  const handleSelect = (data: any) => {
    setEventLocal(data);
  };

  useEffect(() => {
    if (eventLocal !== null) {
      console.log('Dados do Local:', eventLocal);
    }
  }, [eventLocal]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const response = await login(emailValue, passwordValue);
        if (response && response.isLogged) {
            Cookies.set(response.cookieName, response.cookieInfo)
            console.log(Cookies.get(response.cookieName));
            
            navigate('/map');
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <>
      <Header toMap={false} />
      <div className={styles.formContainer}>
        <div className={styles.photoForm}>
          <span>Banner do Evento</span>
          <label
            className={styles.customFileInput}
            style={{
              backgroundImage: backgroundImage,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}
          >
            <input
              type="file"
              className={styles.inputPhoto}
              onChange={handleFileChange}
            />
            <span className={styles.plusSymbol}>
              <img src={PlusSymbol} alt="+" />
            </span>
          </label>
        </div>

        <div className={styles.textForm}>
          <div className={styles.leftColumn}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="eventname">
                Nome do evento
              </label>
              <div className={styles.inputOuterStyle}>
                <img className={styles.inputIcon} src={person_icon} alt="" />
                <input
                  className={styles.input}
                  placeholder="Adicione o nome do evento"
                  type="text"
                  id="eventname"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="eventLocal">
                Local do Evento
              </label>
              <div className={styles.inputOuterStyle}>
                <img className={styles.inputIcon} src={pinpoint_icon} alt="Localização" />
                <Map
                  setSelect={handleSelect}
                />
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="eventTime">
                Hora do Evento
              </label>
              <div className={styles.inputOuterStyle}>
                <img className={styles.inputIcon} src={clock_icon} alt="" />
                <input
                  className={styles.input}
                  type="time"
                  id="eventTime"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="date">
                Data do Evento
              </label>
              <div className={styles.inputOuterStyle}>
                <img className={styles.inputIcon} src={calendar_icon} alt="" />
                <input
                  className={styles.input}
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" onClick = {handleSubmit} className={styles.submitButton}>Adicionar Evento</button>
      </div>
    </>
  );
}

export default EventForm;
