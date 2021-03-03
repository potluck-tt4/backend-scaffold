const router = require("express").Router();
const Items = require("./items-model");

router.get("/", (req, res) => {
    Items.findBy(req.body)
        .then((items) => {
            res.status(200).json(items);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});
router.post("/", (req, res) => {
    const itemObject = {
        user_id: null,
        name: req.body.item_name,
        potluck_id: req.body.potluck_id,
    };
    Items.add(itemObject)
        .then((potluck) => {
            res.status(200).json(potluck);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        });
});

router.put("/", (req, res) => {
    const newUserId = req.body.user_id;
    const itemId = req.body.item_id;
    Items.update(itemId, newUserId)
        .then((item) => {
            res.status(200).json(item);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.delete("/:itemid", (req, res) => {
    Items.remove(req.params.itemid)
        .then(() => {
            res.status(200).json({ message: "deleted" });
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

module.exports = router;
