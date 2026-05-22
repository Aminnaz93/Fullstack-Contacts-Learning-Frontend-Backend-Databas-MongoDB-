import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/api";
import {useAuth} from "../context/useAuth";


function ContactsWithContext() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        api.getContact()
            .then(data => {
                setContacts(data || []);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    function doLogout() {
        logout(); // denna ska hanteras via context
        navigate("/");
    }

    return ( 
        <div>
            <header>
                <h3>Your Contacts</h3>
                <button onClick={doLogout}>Log out</button>
            </header>

            <section>
                {loading && <p>Laddar...</p>}

                {contacts.length === 0 && !loading ? (
                    <p>Inga kontakter ännu</p>
                ) : (
                    contacts.map((c) => (
                        <div key={c.id || c._id}>
                            <p>{c.name}</p>
                            <p>{c.email}</p>
                            <p>{c.phone}</p>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}

export default ContactsWithContext;
