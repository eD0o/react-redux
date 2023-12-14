import './global.scss'
import React from 'react'
import { connect } from 'react-redux'

function App({counter, dispatch}) {
  return (
    <>
      <p>Total: {counter}</p>
      <button onClick={()=> dispatch({type:'INCREMENT'})} >Increment</button>
    </>
  )
}

const mapStateToProps = (state) =>{
  return {counter: state}
}

export default connect(mapStateToProps)(App)
