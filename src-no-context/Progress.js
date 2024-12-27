import React from 'react'

export default function Progress({index ,answer,numQuestions,totalPoint,points}) {
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
