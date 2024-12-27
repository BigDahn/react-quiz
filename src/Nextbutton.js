import React from 'react'
import { useReactQuiz } from './contexts/ReactContext'


function Nextbutton() {
  const { dispatch, answer, numQuestions, index } = useReactQuiz()
  const hasAnswered = answer !== null // initially answer === null so this expression is false


  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'next' })}
        disabled={!hasAnswered}
      >
        Next
      </button>
    )

    if (index === numQuestions - 1) return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finished' })}
        disabled={!hasAnswered}
      >
        Finish
      </button>
    )
}

export default Nextbutton
