import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
// import Register from './pages/Register'
import Contacts from './pages/Contacts'
// import NotFound from './pages/NotFound'
// import RequireAuth from './components/RequireAuth'
import { isAuthenticated } from './api/api';

//wrapper komponent RequireAuth som skyddar routes och kräver inlogg
function RequireAuth({children}){
    //kontrollera om användaren är inloggad
    if(!isAuthenticated()){
      return <Navigate to="/" />;
    }
    return children;
}




function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        {/* <Route path="/register" element={<Register />} /> */}

        <Route 
          path="/contacts" 
          element={
            <RequireAuth>
              <Contacts />
            </RequireAuth>
          } 
        />
        {/* <Route path="*" element={<NotFound/>}></Route> */}

        

      </Routes>

    </Router>
  )
}

export default App
