const router = require("express").Router();
const Potlucks = require("./potlucks-model");
const restricted = require("../middleware/restricted"); // a middleware for validate the token.

router.get("/", restricted, (req, res) => {
    Potlucks.findById(req.body.id)
        .then((potlucks) => {
            console.log(potlucks);
            res.status(200).json(potlucks);
        })
        .catch((err) => res.send(err));
});
router.post("/", restricted, (req, res) => {
    const id = req.decodedToken.id;
    Potlucks.add({ ...req.body, user_id: id })
        .then((potluck) => {
            res.status(200).json(potluck);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

module.exports = router;
