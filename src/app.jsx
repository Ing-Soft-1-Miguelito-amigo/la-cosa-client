import { Route, Router, Routes } from 'react-router-dom'
import HomeRouter from './routes/HomeRouter'
import GameCreationFormRouter from './routes/GameCreationFormRouter'
import GameJoinFormRouter from './routes/GameJoinFormRouter'
import GameRouter from './routes/GameRouter'
import EndOfGameRouter from './routes/EndOfGameRouter'
import DIVS from './divs'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeRouter></HomeRouter>}></Route>
        <Route path="/game-creation-form" element={<GameCreationFormRouter></GameCreationFormRouter>}/>
        <Route path="/game-join-form" element={<GameJoinFormRouter></GameJoinFormRouter>}/>
        <Route path="/game/:game_id" element={<GameRouter></GameRouter>}/>
        <Route path="/end-of-game" element={<EndOfGameRouter></EndOfGameRouter>}/>
        <Route path="/div" element={<DIVS/>}/>
      </Routes>
    </div>
  )
}

//<Route path="to/page(/:pathParam1)(/:pathParam2)" component={MyPage} />

export default App;