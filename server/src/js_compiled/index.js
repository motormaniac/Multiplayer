"use strict";
//This file will eventually be compiled and run in the server directory. Thus, __dirname = "/server"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
if (!process.env)
    throw "env is undefined. Try making a .env file?";
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
app.use(express_1.default.static("static"));
app.get("/", (req, res, next) => {
    console.log("Request");
    //Root file directory: /server/static
    res.sendFile("main.html", { root: path_1.default.join(__dirname, "/static") }, (err) => {
        if (err) {
            next(err);
        }
        else {
            console.log("Successfuly sent file");
        }
    });
});
