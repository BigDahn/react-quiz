import React from 'react'


function Nextbutton({ dispatch, answer, numQuestions, index }) {
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
