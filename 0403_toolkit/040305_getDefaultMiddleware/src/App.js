import './global.scss'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { increment, decrement } from './store/counter';
import {open, close} from './store/modal';

function App() {
  const {counter, modal} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      {modal && <p>Total: {counter.total}</p>}
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(open())}>Open</button>
      <button onClick={() => dispatch(close())}>Close</button>
    </>
  )
}

export default App