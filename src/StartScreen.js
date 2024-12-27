import React from 'react'
import { useReactQuiz } from './contexts/ReactContext'

function StartScreen() {
  const {dispatch} = useReactQuiz()
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>15 questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type : "startGame"})}>let's Start!</button>
    </div>
  )
}

export default StartScreen
