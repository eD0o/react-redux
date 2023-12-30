import React, { useState } from 'react';
import Photos from './Photos';

function App() {
  const [toggle, setToggle] = useState(true);


  return (
    <>
      <button onClick={()=> setToggle(!toggle)}>Toggle</button>
      {toggle && <Photos />}
    </>
  )
}

export default App
