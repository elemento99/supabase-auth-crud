import { useState } from 'react'
import { useEffect } from 'react'
import supabase from './supabase-client'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { TaskContextProvider } from './context/TaskContext'


import Login from './components/login'

import Home from './pages/Home'
import NotFound from './pages/NotFound'


function App() {
    const navigate = useNavigate()



    return (
        <div className="App">       
         <TaskContextProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </TaskContextProvider></div>

    )
}

export default App
