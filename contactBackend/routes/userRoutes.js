const express = require('express');
const {registerUser, loginUser, currentUser} = require("../controllers/UserController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

//vilka crud funktioner som vi behöver för userSchema
//Post Login
router.post("/register", registerUser);

//Post register
router.post("/login", loginUser);

//get User
router.get("/current",validateToken, currentUser);

module.exports = router;

