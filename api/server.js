const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const UsersRouter = require("./users/users-router");
const AuthRouter = require("./auth/auth-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", AuthRouter);
server.use("/api/users", UsersRouter);

server.use("/", (req, res) => {
    res.status(200).json({ message: `api up. Hello bubblegum.` });
});

module.exports = server;
