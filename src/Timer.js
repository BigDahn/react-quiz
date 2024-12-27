import { useEffect } from "react"
import { useReactQuiz } from "./contexts/ReactContext"


export default function Timer() {
  const {
dispatch, secondsRemaining
  } = useReactQuiz()
const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60




  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })

      return () => clearInterval(id)
    }, 1000)
  }, [dispatch])
  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  )
}
