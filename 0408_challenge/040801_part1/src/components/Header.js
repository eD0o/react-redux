import React from 'react';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../store/login';

const Header = () => {

  const { user, token } = useSelector(state => state.login)
  const loading = token.loading || user.loading;

  const dispatch = useDispatch();

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Mini Dogs</h1>
        <button
          onClick={() => dispatch(userLogout())}
          aria-label="Logout"
          className={`
          ${styles.headerLogin}
          ${loading ? styles.headerLoginLoading : ''}
          ${user.data ? styles.headerLoginLoaded : ''}
          `}
        ></button>
      </header>
    </>
  )
}

export default Header;