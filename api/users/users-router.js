const router = require("express").Router();
const Users = require("./users-model.js");
const restricted = require("../middleware/restricted"); // a middleware for validate the token.

router.get("/", restricted, (req, res) => {
    Users.find()
        .then((users) => {
            users.forEach((user) => {
                delete user["password"];
                delete user["created_at"];
                delete user["updated_at"];
            });
            res.status(200).json(users);
        })
        .catch((err) => res.send(err));
});

router.get("/potlucks", restricted, (req, res) => {
    Users.findPotlucksByUserId(req.decodedToken.id)
        .then((potlucks) => {
            res.status(200).json(potlucks);
        })
        .catch((err) => res.send(err));
});

router.post("/potlucks", restricted, (req, res) => {
    Users.addPotluck({ ...req.body, user_id: req.decodedToken.id })
        .then((potluck) => {
            res.status(200).json(potluck);
        })
        .catch((err) => res.send(err));
});

module.exports = router;
