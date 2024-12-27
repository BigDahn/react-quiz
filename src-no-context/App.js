import React, { useEffect, useReducer } from 'react'
import Loader from './Loader'
import Header from './Header'
import Main from './Main'
import Error from './Error'
import StartScreen from './StartScreen'
import Questions from './Questions'
import Nextbutton from './Nextbutton'
import Progress from './Progress'
import FinishedScreen from './FinishedScreen'
import Timer from './Timer'

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


function reducer (state,action){
  switch(action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready"
        };
        case "dataFailed":
          return {
            ...state,
            status:"error"
          }
          case "startGame": 
          return {
            ...state,
            status:"active",
            secondsRemaining: state.questions.length * SECS_PER_QUESTION
          }
          case "newAnswer":
            const question = state.questions.at(state.index)
 
            return {
              ...state,
              answer : action.payload,
              points: action.payload === question.correctOption ? state.points + question.points : state.points
            }
            case "next": 
            return {
              ...state,
              index: state.index + 1,
              answer: null
            }
            case "finished":
              return {
                ...state,
                status: 'finished',
                highScore:state.points > state.highScore ? state.points : state.highScore
                
              }
              case "restart":
                return{
                  ...initialState,
                  questions:state.questions,
                  status:"ready"
                }
                case "tick":
                  return {
                    ...state,
                    secondsRemaining: state.secondsRemaining - 1,
                    status: state.secondsRemaining === 0 ? "finished" : state.status
                  }
      default: throw new Error ("New Error")
  }
}

const App = () => {
  const [{questions,status,index,answer,points,highScore,secondsRemaining}, dispatch] = useReducer(reducer, initialState)
  const numQuestion = questions.length
  const totalPoint = questions.reduce((prev,curr)=>{
    return  prev + curr.points
  },0)

  
  useEffect(function(){
fetch('http://localhost:9000/questions')
  .then((res) => res.json())
  .then((data) =>dispatch({type:"dataReceived", payload: data}))
  .catch((err) => dispatch({type:"dataFailed"}))
  },[])
  return (
    <div className="app">
      <Header />
      {status === 'loading' && <Loader />}
      {status === 'dataFailed' && <Error />}
      {status === 'ready' && <StartScreen dispatch={dispatch} />}
      {status === 'active' && (
        <Main>
          <Progress
            index={index}
            answer={answer}
            numQuestions={numQuestion}
            totalPoint={totalPoint}
            points={points}
          />
          <Questions
            questions={questions}
            index={index}
            answer={answer}
            dispatch={dispatch}
          />
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          <Nextbutton
            dispatch={dispatch}
            answer={answer}
            numQuestions={numQuestion}
            index={index}
          />
        </Main>
      )}
      {status === "finished" && <FinishedScreen points={points} totalPoint={totalPoint} highScore={highScore} dispatch={dispatch} />}
    </div>
  )
}


export default App
