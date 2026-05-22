const API_BASE = "http://localhost:3000/api";

//LOCALSTORAGE FÖR ATT HÄMTA OCH SÄTTA TOKEN

export function getToken(){
    //hämta värdet som finns sparat
    return localStorage.getItem("token");
}

export function saveToken(token){
    //sätta värdet
    localStorage.setItem("token", token);

    //bygga på med event med triggers authChange()
    window.dispatchEvent(new Event("authChange"));

}

export function logOut(){
    //Ta bort token från LOCALSTORAGE
    localStorage.removeItem("token");

    //Skickar ett custom event
    //den säger till appen: Auth har ändrats
    window.dispatchEvent(new Event("authChange"));

}

//Kollar om användaren är inloggad 
//!! gör om värdet till TRUE eller false
export function isAuthenticated(){
    //om token finns --> true
    //om token INTE finns ---> false

    return !!getToken();
}

export async function login({email,password}){
    return request("/users/login", {
        method: "POST",

        body: JSON.stringify({email, password}),
    });
}

// export async function login({email, password}){
//     const url = `${API_BASE}/users/login`;

//     const headers = {
//         "Content-Type": "application/json",

//     };

//     const response = await fetch(url, {
//         method: "POST",
//         headers: "headers",
//         body: JSON.stringify({email,password}),
//     });

//     const text = await response.text();
//     let data = null;

//     if(text){
//         data = text;
//     }

//     if(!response.ok){
//         throw new Error("Error testa igen");
//     }

//     return data;
// }



export async function register({name, email, password}){
    return request("/users/register", {
        method: "POST",
        body: JSON.stringify({name,email,password}),
    });
}


//Skapa en generell request-funktion
//alla API anrop går via denna funktion


async function request(path, options = {}){

    //Hämta headers från options om dem finns
    //Annars skapar vi ett tomt objekt
    const headers = options.headers || {};

    //hämtar användarens Token
    const token = getToken();

    if(token){
        headers["Authorization"] = `Bearer ${token}`;   
    }

    headers["Content-Type"] = "application/json";

    const response = await fetch(`${API_BASE}${path}`,{
        //Hämta allt från options
        //method, body osv....
        ...options, 
        //Skickar med headers
        headers,
    });

    //vi läser svaret från servern som text
    const text = await response.text();

    let data;


    try {
        if(text){
            data = JSON.parse(text)
        } else{
            data = null;
        }
    } catch {
        //OM json kraschar så använder vi texten istället
        data = text;
    }

    if(!response.ok){
        throw new Error("Request failed");
    }

    return data;

}


//hämtar alla kontakter
export async function getContact() {
    return request("/contacts", {
        method: "GET",
    });
}

//skapa en ny kontakt 
export async function createContact(contact) {
    return request("/contacts", {
        method: "POST",
        body: JSON.stringify(contact),
    });
}


export default {register, login, logOut, getContact, createContact, saveToken, getToken};
