const mongoose = require("mongoose");

//connection till databasen 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DATABASE CONNECTED:" , conn.connection.host, conn.connection.name);


    } catch (error) {
        console.log("ERROR", error.message);
        process.exit(1);
    }
}


module.exports = connectDB;