import { useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Toaster } from "react-hot-toast"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
function App() {
  const { user } = useSelector(state => state.auth)
  return (
    <>
      <div className="h-screen">
        <BrowserRouter >
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
