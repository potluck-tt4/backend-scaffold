const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const UsersRouter = require("./users/users-router");
const AuthRouter = require("./auth/auth-router");
const PotluckRouter = require("./potlucks/potlucks-router");
const ItemRouter = require("./items/items-router");
const GuestsRouter = require("./guests/guests-router");
const restricted = require("./middleware/restricted"); // a middleware for validate the token.

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", AuthRouter);
server.use("/api/users", restricted, UsersRouter);
server.use("/api/potlucks", restricted, PotluckRouter);
server.use("/api/item", restricted, ItemRouter);
server.use("/api/guests", restricted, GuestsRouter);

server.use("/", (req, res) => {
    res.status(200).json({ message: `api up. Hello bubblegum.` });
});

module.exports = server;
