import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './store/counter';

const Counter = () => {

  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <p>{counter}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  )
}

export default Counter