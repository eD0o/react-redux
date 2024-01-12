import './global.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin, login } from './store/login';
import { sum } from './store/counter';

function App() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.login.user);
  console.log(data);

  React.useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label style={{ display: 'block' }} htmlFor="username">User</label>
        <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        <label style={{ display: 'block' }} htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <button>Enviar</button>
      </form>
      <button onClick={() => dispatch(sum(5))}>Sum</button>
      <p>{data?.email}</p>
    </>
  )
}

export default App