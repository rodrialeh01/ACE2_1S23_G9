import express from "express";
import morgan from "morgan";
import cors from "cors";
import { pool } from "./db.js";
import handlerData from "./routes/data.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/ping", async (req, res) => {
    res.send("pong");
});

app.post("/pong", async (req, res) => {
    console.log(req.body);
});

app.use(handlerData);

app.listen(4000);
console.log(`Server on port 4000`);