const router = require("express").Router();
const Guests = require("./guests-model");

router.get("/", (req, res) => {
    Guests.findBy(req.body)
        .then((guests) => {
            res.status(200).json(guests);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.post("/", (req, res) => {
    Guests.add(req.body)
        .then((addedGuest) => {
            res.status(200).json(addedGuest);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.put("/accept", (req, res) => {
    Guests.update(req.decodedToken.id, req.body.potluck_id)
        .then((accepted) => {
            res.status(200).json({ potluck_id: accepted[0] });
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.delete("/:guestId", (req, res) => {
    Guests.remove(req.params.guestId)
        .then(() => {
            res.status(200).json({ message: "deleted" });
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

module.exports = router;
