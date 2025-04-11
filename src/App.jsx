
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Forget from './Forget'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import Dashboard from './Dashboard'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' Component={Login} />
      <Route path='/register' Component={Register} />
      <Route path='/forget' Component={Forget} />
      <Route path='/dashboard' Component={Dashboard} />

      <Route path='*' Component={NotFound} />

     </Routes>
     
    </>
  )
}

export default App
