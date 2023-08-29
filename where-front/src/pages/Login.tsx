import styles from './Login.module.css';

function Login() {

  return (
    <>
        <article className = { styles.sidebar }>

            <div>
                <h1 className = { styles.title }>Entrar</h1>
                <span className = { styles.titleSpan }>Se você não tiver uma conta, <a className = { styles.signUpLink } href=""> registre-se </a></span>
            </div>

            <form action="submit">
            
                <div className = { styles.inputContainer }>
                    <label className = { styles.inputLabel } htmlFor="">E-mail</label>
                    <input className = { styles.input }type="text" />
                </div>

                <div className = { styles.inputContainer }>
                    <label className = { styles.inputLabel } htmlFor="">Senha</label>
                    <input className = { styles.input } type="text" />
                </div>
                
                <button formAction="submit">Entrar</button>
            </form>
        </article>
    </>
  )
}

export default Login
