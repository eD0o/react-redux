import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { addDates } from './store/date';

function App() {

  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

  const dispatch = useDispatch();

  function handleSubmit(e){
    e.preventDefault();
    dispatch(addDates(checkin, checkout));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Check-in:</label>
        <input type="date" id="checkin" value={checkin} onChange={({ target }) => setCheckin(target.value)} />
        <br />
        <label htmlFor="">Checkout:</label>
        <input type="date" id="checkout" value={checkout} onChage={({ target }) => setCheckout(target.value)} />
        <button>Search</button>
      </form>
    </>
  )
}

export default App
