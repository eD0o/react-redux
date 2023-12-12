import './global.scss'
import { useDispatch, useSelector } from 'react-redux'

function App() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <p>State: {state}</p>
      <button onClick={()=> dispatch({type:'INCREMENT'})}>INCREMENT</button>
    </>
  )
}

export default App
