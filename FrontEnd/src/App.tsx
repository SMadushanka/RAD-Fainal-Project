import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import MyPosts from './pages/MyPosts'
import Register from './pages/Register'
import SellerProfile from './pages/SellerProfile'
import Sellers from './pages/Sellers'
import Vehicles from './pages/Vehicles'

import VehicleDetails from './pages/VehicleDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/profile/:sellerId" element={<SellerProfile />} />
      </Routes>
    </Router>
  )
}

export default App
