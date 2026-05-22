import { useState } from 'react';
import { isAuthenticated, saveToken, logOut as apiLogout } from '../api/api';
import AuthContext from './authContext';

//provider-komponent som omsluter hela appen i main.jsx

export function AuthProvider({ children }) {

    const [authed, setAuthed] = useState(isAuthenticated());

    function login(token){
        saveToken(token); // sparar token i LOCALSTORAGE via api.js
        setAuthed(true);
    }

    function logout(){
        apiLogout(); //Ta bort token från LOCALSTORAGE via api.js
        setAuthed(false);
    }

    
    return (
        <AuthContext.Provider value={{ authed, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
