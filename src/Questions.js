import React from 'react'
import Options from './Options'
import { useReactQuiz } from './contexts/ReactContext'

function Questions() {

  const {
questions,index,answer,dispatch
  } = useReactQuiz()
 
  const question = questions.at(index)
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch}/>
    </div>
  )
}

export default Questions
