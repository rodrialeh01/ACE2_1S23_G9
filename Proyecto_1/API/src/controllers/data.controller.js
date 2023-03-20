import { pool } from "../db.js";

// export const getData = async (req, res) => {
//     // const [rows] = await pool.query("SELECT * FROM datos WHERE sensor = ?", [req.params.sensor]);
//     const [rows] = await pool.query("SELECT dato FROM datos WHERE sensor='?' AND fecha > '2023-02-19 : 00:00:00'", [req.params.sensor]);
//     res.send(rows);
//     console.log(rows);
//     // rows.map((item) => {
//     //     let date = new Date(item.fecha);
//     //     let fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
//     //     let hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
//     //     console.log(fecha, hora);
//     // });
// };

export const configurarPomodoro = async (req, res) => 
{
    // INSERT INTO `configuracion` (`id_usuario`, `nombre`, `tiempo_trabajo`, `tiempo_descanso`, `tiempo_sistema`) VALUES (NULL, 'prueba', '15', '5', current_timestamp());
    const { nombre, tiempo_trabajo, tiempo_descanso } = req.body;
    const [rows] = await pool.query("INSERT INTO configuracion (nombre, tiempo_trabajo, tiempo_descanso) VALUES (?, ?, ?)", [nombre, tiempo_trabajo, tiempo_descanso]);
    console.log(rows);
    res.send( { 
        id: rows.insertId
    });
};

export const dataPomodoro = async (req, res) => 
{
    // INSERT INTO `datos` (`id`, `id_usuario`, `tiempo`, `estado`, `id_pomodoro`, `fase_pomodoro`) VALUES (NULL, '2', current_timestamp(), '0', '1', '2');
    const {id_usuario, estado, id_pomodoro, fase_pomodoro} = req.body;
    const [rows] = await pool.query("INSERT INTO datos (id_usuario, estado, id_pomodoro, fase_pomodoro) VALUES (?, ?, ?, ?)", [id_usuario, estado, id_pomodoro, fase_pomodoro]);
    res.send("OK");
};
