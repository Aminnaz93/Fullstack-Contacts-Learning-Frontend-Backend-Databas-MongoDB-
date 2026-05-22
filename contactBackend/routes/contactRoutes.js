const express = require('express');

const router = express.Router();
const {getContacts, createContact,getContact,updateContact,deleteContact} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

//Här definierar vi routes och vilken metod endast

//sätter validering på alla routes
router.use(validateToken);

//definiera routes
//GET på /api/contacts och post
router.route("/").get(getContacts).post(createContact);

//Post på /api/contacts
// router.route("/").post((req, res) => {
//     res.status(200).json({
//         message: "Hej från min första server :) "
//     });
// });

//GET :id
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


//PUT :id
// router.route("/:id").put((req,res) => {
//     res.status(200).json({message: "Hämtar endast en kontakt"});
// });

//Delete :id
// router.route("/:id").delete((req,res) => {
//     res.status(200).json({message: "Hämtar endast en kontakt"});
// });

module.exports = router;