const express = require("express");
const cors = require("cors");

const AuthRouter = require("./auth/auth-router.js");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api", AuthRouter);

module.exports = server;
