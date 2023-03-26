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
    // console.log(rows);
    res.send( { 
        "estado": true
    });
};

export const dataPomodoro = async (req, res) => 
{
    // INSERT INTO `datos` (`id`, `id_usuario`, `tiempo`, `estado`, `id_pomodoro`, `fase_pomodoro`) VALUES (NULL, '2', current_timestamp(), '0', '1', '2');
    const {estado, id_pomodoro, fase_pomodoro} = req.body;
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id_usuario = rows[0].id;
    const [rows2] = await pool.query("INSERT INTO datos (id_usuario, estado, id_pomodoro, fase_pomodoro) VALUES (?, ?, ?, ?)", [id_usuario, estado, id_pomodoro, fase_pomodoro]);
    const [rows3] = await pool.query("UPDATE login SET fase = ? WHERE id = 1", [fase_pomodoro]);
    res.send("OK");
};

export const getLastId = async (req, res) =>
{
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS actual_id_user FROM configuracion");
    res.send(rows);
}

export const getLastTime = async (req, res) =>
{
    const id = req.params.id;
    console.log(id);
    const [rows] = await pool.query("SELECT tiempo_trabajo, tiempo_descanso FROM configuracion WHERE id_usuario = ?", [id]);
    res.send(rows);
}

export const updateConfig = async (req, res) =>
{
    // UPDATE `configuracion` SET `tiempo_trabajo` = '4', `tiempo_descanso` = '53' WHERE `configuracion`.`id_usuario` = 4;
    const { tiempo_trabajo, id_usuario } = req.body;
    const [rows] = await pool.query("UPDATE configuracion SET tiempo_trabajo = ? WHERE id_usuario = ?", [ tiempo_trabajo, id_usuario]);
    res.send("OK");
}

export const updateConfig2 = async (req, res) =>
{
    // UPDATE `configuracion` SET `tiempo_trabajo` = '4', `tiempo_descanso` = '53' WHERE `configuracion`.`id_usuario` = 4;
    const { tiempo_descanso, id_usuario } = req.body;
    const [rows] = await pool.query("UPDATE configuracion SET tiempo_descanso = ? WHERE id_usuario = ?", [ tiempo_descanso, id_usuario]);
    res.send("OK");
}

export const configTiempoTrabajo = async (req, res) =>
{
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id = rows[0].id;
    const [rows2] = await pool.query("UPDATE configuracion SET tiempo_trabajo = ? WHERE id_usuario = ?", [ req.params.t, id]);
    res.send("OK");
}

export const updateLogin = async (req, res) =>
{
    const { estado } = req.body;
    const [rows] = await pool.query("UPDATE login SET estado = ? WHERE id = 1", [ estado]);
    res.send("OK");
}

export const getLogin = async (req, res) =>
{
    const [rows] = await pool.query("SELECT estado FROM login WHERE id = 1");
    res.send("{"+String(rows[0].estado)+"}");
   // console.log(rows[0].estado);
}

export const updateConfigTime = async (req, res) =>
{
    const { estado } = req.body;
    const [rows] = await pool.query("UPDATE login SET configurar = ? WHERE id = 1", [ estado]);
    res.send("OK");
}

export const getConfigTime = async (req, res) =>
{
    const [rows] = await pool.query("SELECT configurar FROM login WHERE id = 1");
    res.send(rows);
}

export const simulate = async (req, res) =>
{
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id = rows[0].id;
    // const [dataUser] = await pool.query("SELECT tiempo_trabajo, tiempo_descanso FROM configuracion WHERE id_usuario = ?", [id]);
    // const { tiempo_trabajo, tiempo_descanso } = dataUser[0];
    const [tiemposDescanso] = await pool.query("SELECT tiempo FROM datos WHERE id_usuario = ? AND fase_pomodoro = ? and estado = 1", [id, 2]);
    let inicio = new Date(tiemposDescanso[0].tiempo);
    if (inicio == undefined || inicio == null)
    {
        res.send("Mire la db mi compaa");
    }
    let fin = new Date(tiemposDescanso[tiemposDescanso.length - 1].tiempo);
    let tiempoTotal = fin.getTime() - inicio.getTime();
    let tiempoTotalSegundos = tiempoTotal / 1000;

    console.log(tiempoTotalSegundos);

    res.send({
        "fecha_inicio": inicio,
        "fecha_fin": fin,
        "penalizacion": tiempoTotalSegundos
    });
}

export const getWorkTime = async (req, res) =>
{
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id = rows[0].id;
    const [dataUser] = await pool.query("SELECT tiempo_trabajo FROM configuracion WHERE id_usuario = ?", [id]);
    const { tiempo_trabajo } = dataUser[0];

    res.send("\{"+tiempo_trabajo+"\}");
}

export const getFreeTime = async (req, res) =>
{
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id = rows[0].id;
    const [dataUser] = await pool.query("SELECT tiempo_descanso FROM configuracion WHERE id_usuario = ?", [id]);
    const { tiempo_descanso } = dataUser[0];

    res.send("\{"+tiempo_descanso+"\}");
}

export const resetTime = async (req, res) =>
{
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id = rows[0].id;
    const [rows2] = await pool.query("UPDATE configuracion SET tiempo_trabajo = 25, tiempo_descanso = 5 WHERE id_usuario = ?", [id]);
    res.send("OK");
}