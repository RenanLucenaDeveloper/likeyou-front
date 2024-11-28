import { React } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import ToolbarRoutes from './components/layouts/ToolbarRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* Rotas que tem Toolbar */}
        <Route path='/' element={<ToolbarRoutes />}>
          <Route index element={<Home />} />
          <Route path='profile/:id' element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
