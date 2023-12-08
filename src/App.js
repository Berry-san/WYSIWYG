import './App.css'
import { Route, Navigate, Routes } from 'react-router'
import { useSelector } from 'react-redux'
import Login from './Pages/Auth/Login'
import Layout from './Pages/global/Layout'
import Dashboard from './Pages/Dashboard'
import UserCreation from './Pages/UserCreation'
import Users from './Pages/Users'
import EmailList from './EmailList'
import EmailReport from './Pages/EmailReport'

function App() {
  const { isAuthenticated } = useSelector((state) => state.user.user)

  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          isAuthenticated ? <Navigate replace to="/layout" /> : <Login />
        }
      />
      <Route path="/layout" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="emailList" element={<EmailList />} />
        <Route path="emailReport" element={<EmailReport />} />
        <Route path="createUser" element={<UserCreation />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route index element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
