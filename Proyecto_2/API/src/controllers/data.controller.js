import { pool } from "../db.js";

export const setSensors = async (req, res) => 
{
    const { humedad, tmp_int, tmp_ext } = req.body;
    const [rows] = await pool.query("INSERT INTO sensores (humedad, tmp_int, tmp_ext) VALUES (?, ?, ?)", [humedad, tmp_int, tmp_ext]);
    res.send("OK");
};

export const filtarTmpInt = async (req, res) =>
{
    // SELECT id_usuario, nombre FROM configuracion WHERE (tiempo_sistema BETWEEN '2023-03-24:00:00:00' AND '2023-03-24:23:59:59');
    const { fechaInicio, fechaFinal } = req.body;
    const [rows] = await pool.query("SELECT tmp_int FROM sensores WHERE (tiempo BETWEEN ? AND ?)", [ fechaInicio, fechaFinal ]);
    res.send(rows);
}

export const filtarTmpExt = async (req, res) =>
{
    const { fechaInicio, fechaFinal } = req.body;
    const [rows] = await pool.query("SELECT tmp_ext FROM sensores WHERE (tiempo BETWEEN ? AND ?)", [ fechaInicio, fechaFinal ]);
    res.send(rows);
}

export const filtarHumedad = async (req, res) =>
{
    const { fechaInicio, fechaFinal } = req.body;
    const [rows] = await pool.query("SELECT humedad FROM sensores WHERE (tiempo BETWEEN ? AND ?)", [ fechaInicio, fechaFinal ]);
    res.send(rows);
}