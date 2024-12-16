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
import ChangeProfilePicture from './components/ChangeProfilePicture'
import "react-toastify/dist/ReactToastify.css"
import FinishRegister from './components/auth/FinishRegister'
import EditProfile from './components/EditProfile'

function App() {

  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/finish-register' element={<FinishRegister />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/change-profile-picture' element={<ChangeProfilePicture />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/edit-profile' element={<EditProfile />} />

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
