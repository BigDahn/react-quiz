import React from 'react'
import Options from './Options'

function Questions({questions,index,answer,dispatch}) {
 
  const question = questions.at(index)
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch}/>
    </div>
  )
}

export default Questions
