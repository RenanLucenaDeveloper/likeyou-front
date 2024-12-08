import { React } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import Welcome from './components/Welcome'
import ToolbarRoutes from './components/layouts/ToolbarRoutes'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/welcome' element={<Welcome />} />

        {/* Rotas que tem Toolbar */}
        <Route path='/' element={<ToolbarRoutes />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='profile/:id' element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
