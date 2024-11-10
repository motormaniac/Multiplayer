"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(process.env.PORT, () => {
    console.log("Listening on port 8080");
});
app.use("/static", express_1.default.static("static"));
app.get("/", (req, res) => {
    console.log("worked");
    console.log(req.hostname);
    res.send(req.hostname);
});
