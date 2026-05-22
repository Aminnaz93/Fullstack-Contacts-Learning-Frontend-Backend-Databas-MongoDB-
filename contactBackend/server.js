//Express = webbramverk för att bygga backend server(ROUTES)
const express = require("express");

//Dotenv = läsa vad som står i .env filen
const dotenv = require("dotenv").config();

//Importera routes
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");

//Importera databas connection
const connectDB = require("./config/dbConnection");

//Koppla upp mot MongoDB
connectDB();

//nodemon = startar om server när du ändrar koden (dev only)

const app = express();

//Middleware för att läsa JSON från body
app.use(express.json());

app.use(cors
    ({
        origin: "http://localhost:5173",
    }),

);
//Routes
app.use("/api/contacts", contactRoutes);
// app.use("/api/users"); // definiera routes anropa här
app.use("/api/users", userRoutes);


//home route
//localhost:3000
app.get("/", (req, res) => {
    res.send("Servern fungerar!");
});

//starta server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servern är igång på port ${PORT}`);
});