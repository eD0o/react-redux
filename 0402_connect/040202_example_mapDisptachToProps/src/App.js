import './global.scss'
import React from 'react'
import { connect } from 'react-redux'

const increment = () => ({ type: 'INCREMENT' })

function App({counter, increment}) {
  return (
    <>
      <p>Total: {counter}</p>
      <button onClick={increment}>Increment</button>
    </>
  )
}

const mapStateToProps = (state) => {
  return { counter: state }
}

const mapDispatchToProps = {
  increment
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
