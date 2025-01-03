import './App.css'

import { Box } from '@chakra-ui/react'
import Body from './components/Body/Body'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import About from './components/Body/About'
import Topics from './components/Body/content/Topics'
import Chapter from './components/Body/content/Chapter'
import Loading from './components/Loading'
import Challenge_Chapter from './components/Body/content/Challenge_Chapter'
import Challenge_Free from './components/Body/content/Challenge_Free'


function App() {

  return (
    <Box >
      <Routes>

        {/* No Account  */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
          
        {/*With Account */}
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/chapters" element={<Chapter />} />
        <Route path="/challenges" element={<Challenge_Free />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/tasks" element={<Challenge_Chapter />} />
      </Routes>
    </Box>
  )
}

export default App
