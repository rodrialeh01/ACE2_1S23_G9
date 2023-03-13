import { pool } from "../db.js";

export const getData = async (req, res) => {
    // const [rows] = await pool.query("SELECT * FROM datos WHERE sensor = ?", [req.params.sensor]);
    const [rows] = await pool.query("SELECT dato FROM datos WHERE sensor='?' AND fecha > '2023-02-19 : 00:00:00'", [req.params.sensor]);
    res.send(rows);
    console.log(rows);
    // rows.map((item) => {
    //     let date = new Date(item.fecha);
    //     let fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    //     let hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    //     console.log(fecha, hora);
    // });
};

export const getAllData = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM datos");
    res.send(rows);
    console.log(rows);
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

export const pushData = async (req, res) => 
{
    let temp = req.body;
    let sensor = temp.map((item) => item.sensor);
    let dato = temp.map((item) => item.dato);
    console.log(sensor, dato);
    const [rows] = await pool.query("INSERT INTO datos (sensor, dato) VALUES (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)", [sensor[0], dato[0], sensor[1], dato[1], sensor[2], dato[2], sensor[3], dato[3], sensor[4], dato[4], sensor[5], dato[5]]);
    res.send("OK");
};
