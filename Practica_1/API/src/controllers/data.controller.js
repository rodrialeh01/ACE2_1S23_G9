import { pool } from "../db.js";

export const getData = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM datos WHERE sensor = ?", [req.params.sensor]);
    res.send(rows);
    console.log(rows);
    // rows.map((item) => {
    //     let date = new Date(item.fecha);
    //     let fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    //     let hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    //     console.log(fecha, hora);
    // });
};

export const createData = async (req, res) => 
{
    const { sensor, dato } = req.body;
    const [rows] = await pool.query("INSERT INTO datos (sensor, dato) VALUES (?, ?)", [sensor, dato]);
    res.send( { 
        sensor,
        dato
    });
};