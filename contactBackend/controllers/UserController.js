//Controller ta emot och returnera http request och response
//varje funktion har desc, route, access = dokumentation
//Varje funktion = en route handler, vad som ska hända när vi är vid datan.

const asyncHandler = require("express-async-handler"); //Slippa skriva try n catch

const User = require("../models/userModel"); // databas hantering (kommunicering)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//@desc register user
//@route POST /api/users/register
//@access public

//registrera user
const registerUser = asyncHandler (async (req, res) => {
    //vi hämtar data från body
    const {name, email, password} = req.body;

    //Valider input
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Snälla fyll i alla fält!");
    }

    //kontrollera om email redan finns
    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("Email already exists!");
    }
    //Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password" ,hashedPassword);

    //skapa user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    //spara i mongodb
console.log("User created:", user);

if(user){
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
    });
} else{
    res.status(400);
    throw new Error("User data is not valid.");
}
    //response /nya user 

});


//@desc login user
//@route POST /api/users/login
//@access public

//@desc login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {

    //hämta data 
    const { email, password } = req.body;

    //Valider input
    if(!email || !password){
        res.status(400);
        throw new Error("Snälla fyll i alla fält!");
    }

    //check med databas om user finns 
    const user = await User.findOne({ email });

    //jämföra input med databasen
    //vi jämför input lösenord med lagrade hashade password
    if(user && (await bcrypt.compare(password, user.password))){

        //Skapa JWT token
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.name,
                    email: user.email,
                    id: user.id,
                },
            },

            //hemlig nyckel från .env
            process.env.ACCESS_TOKEN_SECRET,

            //hur länge token ska gälla
            { expiresIn: "15m" }
        );

        //om korrekt så --> log in (jwt-token med user info)
        //response blir vår token
        res.status(200).json({ accessToken });

    } else {

        res.status(401);
        throw new Error("Email eller lösenord är fel");
    }
});

//@desc get cirremt user
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});



module.exports = {registerUser, loginUser, currentUser}

