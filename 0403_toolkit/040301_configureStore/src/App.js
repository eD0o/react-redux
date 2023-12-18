import './global.scss'
import React from 'react'
import {useSelector} from 'react-redux'

function App() {
  const state = useSelector(state => state);
  console.log(state);
  return (
    <>
      <p>Total: </p>
      <button>Increment</button>
    </>
  )
}

export default App