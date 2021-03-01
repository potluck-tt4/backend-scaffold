const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const Users = require("../users/users-model");
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const hash = bcryptjs.hashSync(
            credentials.password,
            parseInt(process.env.BCRYPT_ROUNDS)
        );
        credentials.password = hash;

        Users.add(credentials)
            .then((user) => {
                delete user["password"]; // deletes hashed password from users object
                delete user["created_at"];
                delete user["updated_at"];
                const token = createToken(user);
                res.status(201).json({ ...user, token });
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password",
        });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then((user) => {
                console.log(user);
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);

                    res.status(200).json({
                        message: "Welcome " + user.username,
                        token,
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password",
        });
    }
});

function createToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        id: user.user_id,
    };
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, process.env.SECRET, options);
}
module.exports = router;
