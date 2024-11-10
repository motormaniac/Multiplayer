const dotenv = require("dotenv").config();
import express, {Express, Request, Response} from "express";
const app:Express = express();

app.listen(process.env.PORT, ()=>{
    console.log("Listening on port 8080")
})

app.use("/static", express.static("static"))

app.get("/", (req:Request, res:Response) => {
    console.log("worked");
    console.log(req.hostname);
    res.send(req.hostname);
})