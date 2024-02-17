import './App.css'

import { Box } from '@chakra-ui/react'
import Body from './components/Body/Body'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import NavBar from './components/Head/navigation/NavBar'
import About from './components/Body/About'
import Topics from './components/Body/content/Topics'
import Chapter from './components/Body/content/Chapter'
import Task from './components/Body/content/Task'
import { useState, useEffect } from 'react'
import { getChapter, getCourse, getTopic } from './api/api'
import Loading from './components/Loading'

function App() {

  return (
    <Box >
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/chapters" element={<Chapter />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </Box>
  )
}

export default App
