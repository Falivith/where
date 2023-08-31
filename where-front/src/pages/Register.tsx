import styles from './Register.module.css';
import padlock from '../assets/padlock_icon.png';
import email from '../assets/email_icon.png';
import invisibleEye from '../assets/eye.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

  return (
    <>
        <article className = { styles.sidebar }>

            <div>
                <h1 className = { styles.title }>Criar Conta</h1>
                <span className = { styles.titleSpan }>Se você já tiver uma conta, <Link to="/" className={styles.signUpLink}> entre aqui! </Link></span>
            </div>

            <form className = { styles.form } onSubmit = {handleSubmit}>
            
                <div className = { styles.inputContainer }>

                    <label className = { styles.inputLabel } htmlFor="">E-mail</label>
                    <div className = { styles.inputOuterStyle }>
                        <img className = { styles.inputIcon } src = { email } alt="" />
                        <input className = { styles.input } placeholder = "Entre com seu endereço de email" type="text" />
                    </div>

                </div>

                <div className = { styles.inputContainer }>

                    <label className = { styles.inputLabel } htmlFor="">Nome de Usuário</label>
                    <div className = { styles.inputOuterStyle }>
                        <img className = { styles.inputIcon } src = { email } alt="" />
                        <input className = { styles.input } placeholder = "Digite seu nome de usuário" type="text" />
                    </div>

                </div>

                <div className = { styles.inputContainer }>
                    <label className = { styles.inputLabel } htmlFor="">Senha</label>
                    <div className = { styles.inputOuterStyle }>
                        <img className = { styles.inputIcon } src = { padlock } alt="" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={styles.input}
                            placeholder="Entre com sua senha"
                        />
                        <button className = { styles.inputIconButton } onClick={toggleShowPassword} type="button">
                            <img src = { invisibleEye } />
                        </button>
                    </div>
                </div>

                <div className = { styles.inputContainer }>
                    <label className = { styles.inputLabel } htmlFor="">Confirmar Senha</label>
                    <div className = { styles.inputOuterStyle }>
                        <img className = { styles.inputIcon } src = { padlock } alt="" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={styles.input}
                            placeholder="Confirmar sua senha"
                        />
                        <button className = { styles.inputIconButton } onClick={toggleShowPassword} type="button">
                            <img src = { invisibleEye } />
                        </button>
                    </div>
                </div>
                
                <button type="button" className={styles.loginButton}>Registrar</button>
            </form>
        </article>
    </>
  )
}

export default Register
