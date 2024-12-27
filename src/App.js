
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
import { ReactProvider, useReactQuiz } from './contexts/ReactContext'






const App = () => {
const {status} = useReactQuiz()



  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'dataFailed' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Questions />
            <Timer />
            <Nextbutton />
          </>
        )}
        {status === 'finished' && <FinishedScreen />}
      </Main>
    </div>
  )
}


export default App
