import {io} from 'socket.io-client'
import Home from './pages/Home';
import Editor from './pages/Editor';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/editor/:roomId' element={<Editor/>} />
      </Routes>
    </>
  )
}

export default App;
