import Header from '../components/Header';
import styles from './EventForm.module.css';
import { Link } from 'react-router-dom';
import pinpoint_icon from '../assets/pinpoint_icon.png';
import calendar_icon from '../assets/calendar_icon.png';
import clock_icon from '../assets/clock_icon.png';
import people_icon from '../assets/people_icon.png';

function EventForm() {
    return (
        <>
            <Header toMap={false} />
            <div className={styles.formContainer}>

                <div className = { styles.photoForm }>
                    <span>Imagem do Evento</span>
                    <input type="file" />
                </div>

                <div className = { styles.textForm }>

                    <div className={styles.leftColumn}>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel} htmlFor="eventname">
                                Nome do evento
                            </label>
                            <div className={styles.inputOuterStyle}>
                                <img className={styles.inputIcon} src={people_icon} alt="" />
                                <input
                                    className={styles.input}
                                    placeholder="Adicione o nome do evento"
                                    type="text"
                                    id="eventname"
                                    value={""}
                                    /*onChange={(e) => setUsernameValue(e.target.value)}*/
                                />
                            </div>
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel} htmlFor="local">
                                Local
                            </label>
                            <div className={styles.inputOuterStyle}>
                                <img className={styles.inputIcon} src={pinpoint_icon} alt="" />
                                <input
                                    className={styles.input}
                                    placeholder="Adicione o Local do Evento"
                                    type="text"
                                    id="local"
                                    value={""}
                                    /*onChange={(e) => setUsernameValue(e.target.value)}*/
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                    <div className={styles.inputContainer}>
                            <label className={styles.inputLabel} htmlFor="eventname">
                                Nome do evento
                            </label>
                            <div className={styles.inputOuterStyle}>
                                <img className={styles.inputIcon} src={people_icon} alt="" />
                                <input
                                    className={styles.input}
                                    placeholder="Adicione o nome do evento"
                                    type="text"
                                    id="eventname"
                                    value={""}
                                    /*onChange={(e) => setUsernameValue(e.target.value)}*/
                                />
                            </div>
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel} htmlFor="local">
                                Local
                            </label>
                            <div className={styles.inputOuterStyle}>
                                <img className={styles.inputIcon} src={pinpoint_icon} alt="" />
                                <input
                                    className={styles.input}
                                    placeholder="Adicione o Local do Evento"
                                    type="text"
                                    id="local"
                                    value={""}
                                    /*onChange={(e) => setUsernameValue(e.target.value)}*/
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EventForm;
