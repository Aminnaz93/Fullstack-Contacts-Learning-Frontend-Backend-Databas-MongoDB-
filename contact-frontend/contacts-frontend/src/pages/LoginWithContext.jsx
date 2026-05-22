import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/api";
//useAuth sköter token sparandet och uppdaterar tillståndet för Auth
import {useAuth} from "../context/useAuth";

function LoginWithContext() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    //login funktion som hanterar saveToken hämtas via useAuth
    //Köra saveToken + setAuth(true)
    const {login} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        setError("");

        //Anropa API:et Post Login
        //Om man lyckas så ska vi använda useNavigate till /contacts
        //Vi får token
        //LOCALSTORAGE för att lagra token på webben

        try {
            const data = await api.login({
                email,
                password,
            });

            if(data.accessToken){
                //api.saveToken(data.accessToken); // Göra via contexten
                login(data.accessToken);
                //skickar användaren till contact-sidan 
                navigate("/contacts");
            }else{
                setError("No token found");
            }

            
        } catch (error) {
            setError(error.message);
        }
    }
    return ( 
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} required/>
                <input type="password" value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} required/>

                <button type='submit'>Login</button>
            </form>
            {error && <p>{error}</p>}

        </div>
    );
}

export default LoginWithContext;
