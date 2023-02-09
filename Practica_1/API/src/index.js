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
    const [result] = await pool.query('SELECT * FROM datos');
    res.json(result);
});

app.use(handlerData);

app.listen(3000);
console.log(`Server on port 3000`);