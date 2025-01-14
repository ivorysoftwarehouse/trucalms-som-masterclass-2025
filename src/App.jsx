import { Navigate, Route, Routes } from "react-router-dom"

import Home from "./views/home"
import LoginPage from "./views/login"
import RegistrationPage from "./views/register"
import Dashboard from "./views/dashboard"
import RegisteredPage from "./views/registered"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registered" element={<RegisteredPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </>
  )
}

export default App
