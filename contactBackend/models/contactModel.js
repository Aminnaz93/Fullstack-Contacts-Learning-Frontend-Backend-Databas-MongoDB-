const mongoose = require("mongoose");

//Schema beskriver hur en kontakt ska se ut i databasen
const contactSchema = mongoose.Schema({

    // Koppling till användaren som äger kontakten
    // ObjectId används för att referera till ett User-dokument i MongoDB
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    //Kontaktens namn
    //required betyder att fältet måste fyllas i
    name: {
        type: String,
        required: [true, "Please add a name"],
    },

    //Kontaktens email
    email: {
        type: String,
        required: [true, "Please add an email"]
    },

    //Kontaktens telefonnummer
    phone: {
        type: String,
        required: [true, "Please add a phone number"]
    }

    },
        {
            timestamps: true,
        }

);


module.exports = mongoose.model("Contact", contactSchema);