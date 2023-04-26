import { pool } from "../db.js";

export const setSensors = async (req, res) => 
{
    const { humedad, tmp_int, tmp_ext, pr_agua, est_bomba } = req.body;
    const [rows] = await pool.query("INSERT INTO sensores (humedad, tmp_int, tmp_ext, pr_agua, est_bomba) VALUES (?, ?, ?, ?, ?)", [humedad, tmp_int, tmp_ext, pr_agua, est_bomba]);
    const [rows2] = await pool.query("UPDATE control SET est_bomba = ?, humedad = ? WHERE id = 1", [est_bomba, humedad]);
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

export const filtarAgua = async (req, res) =>
{
    const { fechaInicio, fechaFinal } = req.body;
    const [rows] = await pool.query("SELECT pr_agua FROM sensores WHERE (tiempo BETWEEN ? AND ?)", [ fechaInicio, fechaFinal ]);
    res.send(rows);
}

export const getControl = async (req, res) => {
    const [rows] = await pool.query("SELECT est_bomba, tmp_conf, tmp_act, alerta, humedad FROM control WHERE id = 1");
    res.send(rows);
}

export const setControlApk = async (req, res) => {
    const { tmp_conf, tmp_act, est_bomba } = req.body;
    const [rows] = await pool.query("UPDATE control SET tmp_conf = ?, tmp_act = ?, est_bomba = ? WHERE id = 1", [tmp_conf, tmp_act, est_bomba]);
    res.send("OK");
}