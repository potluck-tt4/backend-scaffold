const router = require("express").Router();
const Potlucks = require("./potlucks-model");
const restricted = require("../middleware/restricted"); // a middleware for validate the token.

router.get("/", restricted, (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => res.send(err));
});

module.exports = router;
