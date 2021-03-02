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
    const id = req.params.id
    Potlucks.updateTime(id,changes)
        .then(potluck=>{
            res.status(200).json(potluck)
        }).catch(error=>{
            res.status(400).json(error)
        })
});

router.post("/:id/guest", restricted, (req, res) => {
    //adds a guest to attend
});

router.post("/:id/accept", (req, res) => {
    //guest accepts invitation
});

router.post("/:id/item", (req, res) => {
    //adds an item
});

router.put("/:id/item", (req, res) => {
    //updates an item with guest bringing the item
});

module.exports = router;
