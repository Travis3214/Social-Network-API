// Import express
const router = require("express").Router();

// Import our controllers
const {
    getUsers,
    getSingleUser,
    createUser,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:userId").get(getSingleUser);

module.exports = router;