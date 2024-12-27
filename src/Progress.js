import React from 'react'
import { useReactQuiz } from './contexts/ReactContext'

export default function Progress() {

const {
index ,answer,numQuestions,totalPoint,points
} = useReactQuiz()
console.log(numQuestions)
console.log(totalPoint)
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index+1}</strong> / {numQuestions}
      </p>

    <p>
      {points}/{totalPoint} points
    </p>
    </header>
  )
}
