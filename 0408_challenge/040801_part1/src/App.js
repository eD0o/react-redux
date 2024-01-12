import './global.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { autoLogin } from './store/login';
import Header from './components/Header';
import Content from './components/Content';

import './App.scss';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  return (
    <>
      <div className='container'>
        <Header />
        <Content />
      </div>
    </>
  )
}

export default App