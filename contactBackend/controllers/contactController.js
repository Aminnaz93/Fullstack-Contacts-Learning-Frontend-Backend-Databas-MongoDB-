//Controller ta emot och returnera http request och response
//varje funktion har desc, route, access = dokumentation
//Varje funktion = en route handler, vad som ska hända när vi är vid datan.

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc GET alla kontakters
// @route GET /api/contacts
//@access private API 

//Get alla kontakter
const getContacts = asyncHandler(async (req, res) => {

    //hämtar endast användarens egna kontakter
    const contacts = await Contact.find({ user_id: req.user.id });

    res.status(200).json(contacts);
});



//@desc POST skapa kontakt
//@route POST /api/contacts
//@access private

//Post kontakt
const createContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;

    //validering
    if (!name || !email || !phone) {
        return res.status(400).json({
            message: "Alla fält måste fyllas i"
        });
    }

    //skapa kontakt
    const contact = await Contact.create({
        name,
        email,
        phone,

        //koppla kontakt till användaren
        user_id: req.user.id,
    });

    res.status(201).json(contact);
});



//@desc GET en kontakt
//@route GET /api/contacts/:id
//@access private

//GET en kontakt
const getContact = asyncHandler(async (req, res) => {

    //hämta kontakt via ID
    const contact = await Contact.findById(req.params.id);

    //om kontakt inte finns
    if (!contact) {
        return res.status(404).json({
            message: "Kontakt hittades inte..."
        });
    }

    //kontrollera att användaren äger kontakten
    if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Kontakt är inte authorizerad.."
        });
    }

    res.status(200).json(contact);
});



//@desc UPDATE kontakt
//@route PUT /api/contacts/:id
//@access private

//UPDATE kontakt
const updateContact = asyncHandler(async (req, res) => {

    //hämta kontakt
    const contact = await Contact.findById(req.params.id);

    //kontroll om kontakt finns
    if (!contact) {
        return res.status(404).json({
            message: "Kontakt hittades inte..."
        });
    }

    //kontrollera att användaren äger kontakten
    if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Kontakt är inte authorizerad.."
        });
    }

    //uppdatera kontakt
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,

        //returnera uppdaterad version
        { new: true }
    );

    res.status(200).json(updatedContact);
});



//@desc DELETE kontakt
//@route DELETE /api/contacts/:id
//@access private

//DELETE kontakt
const deleteContact = asyncHandler(async (req, res) => {

    //hämta kontakt
    const contact = await Contact.findById(req.params.id);

    //kontroll om kontakt finns
    if (!contact) {
        return res.status(404).json({
            message: "Kontakt hittades inte..."
        });
    }

    //kontrollera att användaren äger kontakten
    if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Kontakt är inte authorizerad.."
        });
    }

    //ta bort kontakt
    await Contact.deleteOne({
        _id: req.params.id
    });

    res.status(200).json({
        message: "Contact deleted",
        data: contact
    });
});


//exportera alla controllers
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};
