import './global.scss'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { increment, decrement } from './store/counter';

function App() {
  const state = useSelector((state) => state);
  console.log(state);
  const dispatch = useDispatch();
  return (
    <>
      <p>Total: {state.counter.total}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </>
  )
}

export default App