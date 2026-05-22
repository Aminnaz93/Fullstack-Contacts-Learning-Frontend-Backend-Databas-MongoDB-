import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'

// import Register from './pages/Register'
// import NotFound from './pages/NotFound'
// import RequireAuth from './components/RequireAuth'
import {useAuth} from "./context/useAuth";
import LoginWithContext from './pages/LoginWithContext';
import ContactsWithContext from './pages/ContactsWithContext';

//wrapper komponent RequireAuth som skyddar routes och kräver inlogg
function RequireAuth({children}){
    const { authed } = useAuth();
    if(!authed){ return <Navigate to="/" />; }
    return children;
}




function AppWithContext() {

    //useAuth hämtar authed direkt från contexten
    //ingen useState, useEffect, window, AddeventListener
    //När login och logout ska köras körs i contexten då uppdateras authed automatiskt
    const {authed} = useAuth();


  return (
    <Router>

        <nav>
            <Link to={"/"}>Login</Link>           
            <Link to={"/"}>Register</Link>
            {authed && <Link to={"/contacts"}>Contacts</Link>}

        </nav>


      <Routes>

        <Route path="/" element={<LoginWithContext />} />

        {/* <Route path="/register" element={<Register />} /> */}

        <Route 
          path="/contacts" 
          element={
            <RequireAuth>
              <ContactsWithContext />
            </RequireAuth>
          } 
        />
        {/* <Route path="*" element={<NotFound/>}></Route> */}

        

      </Routes>

    </Router>
  )
}

export default AppWithContext;
