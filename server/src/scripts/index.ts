//This file will eventually be compiled and run in the server directory. Thus, __dirname = "/server"

require("dotenv").config()
import express, {Express, NextFunction, Request, Response} from "express";
import path from "path";
const app:Express = express();

if (!process.env) throw "env is undefined. Try making a .env file?";

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})

app.use(express.static("static"))

app.get("/", (req:Request, res:Response, next:NextFunction) => {
    console.log("Request");
    //Root file directory: /server/static
    res.sendFile("main.html", {root:path.join(__dirname, "/static")}, (err) =>{
        if (err) {
            next(err);
        } else {
            console.log("Successfuly sent file");
        }
    })
})