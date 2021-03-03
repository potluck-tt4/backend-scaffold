const router = require("express").Router();
const Users = require("./users-model.js");

router.get("/", (req, res) => {
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

router.get("/potlucks", (req, res) => {
    Users.findPotlucksByUserId(req.decodedToken.id)
        .then((potlucks) => {
            res.status(200).json(potlucks);
        })
        .catch((err) => res.send(err));
});

router.get("/invitations", (req, res) => {
    Users.findInvitationsByUserId(req.decodedToken.id)
        .then((invitations) => {
            res.status(200).json(invitations);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.post("/potlucks", (req, res) => {
    Users.addPotluck({ ...req.body, user_id: req.decodedToken.id })
        .then((potluck) => {
            res.status(200).json(potluck);
        })
        .catch((err) => res.send(err));
});

module.exports = router;
