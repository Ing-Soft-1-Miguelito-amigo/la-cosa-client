import { Route, Router, Routes } from 'react-router-dom'
import HomeRouter from './routes/HomeRouter'
import GameCreationFormRouter from './routes/GameCreationFormRouter'
import GameJoinFormRouter from './routes/GameJoinFormRouter'
import GameRouter from './routes/GameRouter'
import EndOfGameRouter from './routes/EndOfGameRouter'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeRouter></HomeRouter>}></Route>
        <Route path="/game-creation-form" element={<GameCreationFormRouter></GameCreationFormRouter>}></Route>
        <Route path="/game-join-form" element={<GameJoinFormRouter></GameJoinFormRouter>}></Route>
        <Route path="/game/:id" element={<GameRouter></GameRouter>}></Route>
        <Route path="/end-of-game" element={<EndOfGameRouter></EndOfGameRouter>}></Route>
      </Routes>
    </div>
  )
}

export default App;