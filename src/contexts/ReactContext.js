import { createContext, useContext } from "react";
import React, { useEffect, useReducer } from 'react'

const QuizContexts = createContext()

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
}


function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }
    case 'startGame':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'next':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
    default:
      throw new Error('New Error')
  }
}



function ReactProvider({children}) {

  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])

 const [{questions,status,index,answer,points,highScore,secondsRemaining}, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length
  const totalPoint = questions.reduce((prev,curr)=>{
    return  prev + curr.points
  },0)

  
  

  return (
    <QuizContexts.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        dispatch,
        numQuestions,
        totalPoint,
      }}
    >
      {console.log(questions)}
      {children}
    </QuizContexts.Provider>
  )
}




function useReactQuiz(){
const context = useContext(QuizContexts);
 if (context === undefined) 
    throw new Error('QuizContext was used outside ')
  return context
}



export {ReactProvider, useReactQuiz} 