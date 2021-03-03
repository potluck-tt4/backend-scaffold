const router = require("express").Router();
const Potlucks = require("./potlucks-model");
const restricted = require("../middleware/restricted"); // a middleware for validate the token.

router.get("/", restricted, (req, res) => {
    Potlucks.find()
        .then((potlucks) => {
            res.status(200).json(potlucks);
        })
        .catch((err) => res.send(err));
});

router.get("/:id", restricted, (req, res) => {
    const id = req.params.id;
    Potlucks.findById(id)
        .then((potluck) => {
            res.status(200).json(potluck);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.put("/:id", restricted, (req, res) => {
    //change location and time of potluck
    const changes = req.body;
    const id = req.params.id;
    Potlucks.update(id, changes)
        .then((potluck) => {
            res.status(200).json(potluck);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.delete("/:potluckId", (req, res) => {
    Potlucks.remove(req.params.potluckId, req.decodedToken.id)
        .then(() => {
            res.status(200).json({ message: "deleted" });
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

module.exports = router;
