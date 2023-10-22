import './App.css'
import { Route, Navigate, Routes } from 'react-router'
import Login from './Pages/Auth/Login'
import Layout from './Pages/global/Layout'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
