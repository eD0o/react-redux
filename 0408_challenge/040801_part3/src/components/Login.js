import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/login';
import styles from './Login.module.scss';

const Login = () => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
  }

  return (
    <>
      <form className={`${styles.form} anime`} action="" onSubmit={handleSubmit}>
        <label className={styles.formLabel} htmlFor="username">User:</label>
        <input className={styles.formInput} id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        <label className={styles.formLabel} htmlFor="password">Password:</label>
        <input className={styles.formInput} id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <button className={styles.formButton}>Enviar</button>
      </form>
    </>
  )
}

export default Login