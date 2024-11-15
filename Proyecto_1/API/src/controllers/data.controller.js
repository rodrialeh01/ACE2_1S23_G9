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
    const {estado, fase_pomodoro} = req.body;
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id_usuario = rows[0].id;
    const [rows4] = await pool.query("SELECT idPomodoro FROM login WHERE id = 1;");
    const idPomodoro = rows4[0].idPomodoro;
    const [rows2] = await pool.query("INSERT INTO datos (id_usuario, estado, id_pomodoro, fase_pomodoro) VALUES (?, ?, ?, ?)", [id_usuario, estado, idPomodoro, fase_pomodoro]);
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
    const [rows2] = await pool.query("SELECT fase FROM login WHERE id = 1");
    const fase = rows2[0].fase;
    const [tiemposDescanso] = await pool.query("SELECT tiempo FROM datos WHERE id_usuario = ? AND fase_pomodoro = ? and estado = 1", [id, fase]);
    let inicio;
    let fin;
    try
    {
        inicio = new Date(tiemposDescanso[0].tiempo);
        fin = new Date(tiemposDescanso[tiemposDescanso.length - 1].tiempo);
        
    }
    catch (error)
    {
        res.send({
            "fecha_inicio": "",
            "fecha_fin": "",
            "penalizacion": 0,
            "fase": 0
        });
        return;
    }
    let tiempoTotal = fin.getTime() - inicio.getTime();
    let tiempoTotalSegundos = tiempoTotal / 1000;

    console.log(tiempoTotalSegundos);

    if(fase == 2 || fase == 4 || fase == 6){
        res.send({
            "fecha_inicio": inicio,
            "fecha_fin": fin,
            "penalizacion": tiempoTotalSegundos,
            "fase": fase
        });
    }else{
        res.send({
            "fecha_inicio": "",
            "fecha_fin": "",
            "penalizacion": 0,
            "fase": 0
        });
    }
}

export const simulate2 = async (req, res) =>
{
    const [rows] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id = rows[0].id;
    const [rows2] = await pool.query("SELECT fase FROM login WHERE id = 1");
    const fase = rows2[0].fase;
    const [tiemposDescanso] = await pool.query("SELECT tiempo FROM datos WHERE id_usuario = ? AND fase_pomodoro = ? and estado = 0", [id, fase]);
    let inicio;
    let fin;
    try
    {
        inicio = new Date(tiemposDescanso[0].tiempo);
        fin = new Date(tiemposDescanso[tiemposDescanso.length - 1].tiempo);
        
    }
    catch (error)
    {
        res.send({
            "fecha_inicio": "",
            "fecha_fin": "",
            "penalizacion": 0,
            "fase": 0
        });
        return;
    }
    let tiempoTotal = fin.getTime() - inicio.getTime();
    let tiempoTotalSegundos = tiempoTotal / 1000;

    console.log(tiempoTotalSegundos);

    if(fase == 1 || fase == 3 || fase == 5 || fase == 7){
        res.send({
            "fecha_inicio": inicio,
            "fecha_fin": fin,
            "penalizacion": tiempoTotalSegundos,
            "fase": fase
        });
    }else{
        res.send({
            "fecha_inicio": "",
            "fecha_fin": "",
            "penalizacion": 0,
            "fase": 0
        });
    }
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

export const getFase = async (req, res) =>
{
    const [rows] = await pool.query("SELECT fase FROM login WHERE id = 1");
    res.send(rows);
}

export const updateIdPomodoro = async (req, res) =>
{
    const [rows4] = await pool.query("SELECT idPomodoro FROM login WHERE id = 1;");
    let idPomodoro = rows4[0].idPomodoro;
    idPomodoro = idPomodoro + 1;
    const [rows] = await pool.query("UPDATE login SET idPomodoro = ? WHERE id = 1", [ idPomodoro]);
    res.send("OK");
}

export const filtrarUsuariosPorFecha = async (req, res) =>
{
    // SELECT id_usuario, nombre FROM configuracion WHERE (tiempo_sistema BETWEEN '2023-03-24:00:00:00' AND '2023-03-24:23:59:59');
    const { fecha } = req.body;
    let fechaInicio = fecha + ":00:00:00";
    let fechaFin = fecha + ":23:59:59";
    const [rows] = await pool.query("SELECT id_usuario, nombre FROM configuracion WHERE (tiempo_sistema BETWEEN ? AND ?)", [ fechaInicio, fechaFin ]);
    res.send(rows);
    console.log(rows);
}

export const filtrarDataPorUsuario = async (req, res) =>
{
    // SELECT tiempo, estado FROM datos WHERE id_usuario = 16
    const id_usuario = req.params.id;
    console.log(id_usuario);
    const [rows] = await pool.query("SELECT tiempo, estado FROM datos WHERE id_usuario = ?", [ id_usuario ]);
    // res.send(rows);

    let stateInicial = rows[0].estado;

    let date = new Date(rows[0].tiempo);   
    let array = [];

    let p = {
        "fecha_inicio": date.toLocaleString(),
        "fecha_fin": "",
        "estado": stateInicial
    }

    rows.forEach(element => {
        if(stateInicial != element.estado)
        {
            p.fecha_fin = new Date(element.tiempo).toLocaleString();
            array.push(p);
            stateInicial = element.estado;
            p = {
                "fecha_inicio": new Date(element.tiempo).toLocaleString(),
                "fecha_fin": "",
                "estado": stateInicial
            }
        }
        // array.push(element.tiempo);
    });

    p.fecha_fin = new Date(rows[rows.length - 1].tiempo).toLocaleString();
    p.estado = rows[rows.length - 1].estado;
    array.push(p);

    console.log(array);

    res.send(array);
}

export const totalPomodorosSinFiltro = async (req, res) =>
{
    // SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = 16
    const id_usuario = req.params.id;
    console.log(id_usuario);
    const [rows] = await pool.query("SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = ?", [ id_usuario ]);
    
    let idsPomodoros = rows.filter((item, index) => {
        return rows.findIndex(obj => obj.id_pomodoro === item.id_pomodoro) === index;
    });

    let idsPomodoros2 = idsPomodoros.map((item) => {
        return item.id_pomodoro;
    });

    // console.log(idsPomodoros2);

    let idsFases2;

    idsPomodoros2.forEach(element => {
        let fasesPorIdPomodoro = rows.filter((item) => {
            return item.id_pomodoro === element;
        });

        let fasesGeneral = fasesPorIdPomodoro.map((item) => {
            return item.fase_pomodoro;
        });

        let fasesReducido = fasesGeneral.filter((item, index) => {
            return fasesGeneral.findIndex(obj => obj === item) === index;
        });

        idsFases2 = fasesReducido;
    });

    let listaRanking = [];


    idsPomodoros2.forEach(idPomodoro => {

        let id_pomodoro = idPomodoro;

        idsFases2.forEach(idFase => {
            console.log("idFase: " + idFase);
            let fase = idFase;
            let sentado = 0;
            let parado = 0;
            let data = [];

            rows.forEach(element => {
                if(element.id_pomodoro == idPomodoro && element.fase_pomodoro == idFase)
                {
                    data.push(element);
                    if(element.estado == 1)
                    {
                        sentado++;
                    }
                    else
                    {
                        parado++;
                    }
                }
            });

            let fecha_inicio = new Date(data[0].tiempo).toLocaleString();
            let fecha_fin = new Date(data[data.length-1].tiempo).toLocaleString();
            listaRanking.push({
                id_pomodoro,
                fase,
                sentado,
                parado,
                fecha_inicio,
                fecha_fin
            });
        });
    });

    console.log(idsPomodoros2);
    console.log(idsFases2);
    // console.log(listaRanking);

    res.send(listaRanking);
}

export const totalPomodorosConFiltro = async (req, res) =>
{
    // SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = 16
    const id_usuario = req.params.id;
    const id_pomodoro = req.params.id2;
    console.log(id_pomodoro);
    const [rows] = await pool.query("SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = ? AND id_pomodoro = ?", [ id_usuario, id_pomodoro]);
    
    let fasesPomodoro = rows.map((item) => {
        return item.fase_pomodoro;
    });

    let fasesPomodoroReducido = fasesPomodoro.filter((item, index) => {
        return fasesPomodoro.findIndex(obj => obj === item) === index;
    });

    
    let listaRanking = [];

        fasesPomodoroReducido.forEach(idFase => {
            // console.log("idFase: " + idFase);
            let fase = idFase;
            let sentado = 0;
            let parado = 0;
            let data = [];

            rows.forEach(element => {
                if(element.fase_pomodoro == idFase)
                {
                    data.push(element);
                    if(element.estado == 1)
                    {
                        sentado++;
                    }
                    else
                    {
                        parado++;
                    }
                }
            });

            let fecha_inicio = new Date(data[0].tiempo).toLocaleString();
            let fecha_fin = new Date(data[data.length-1].tiempo).toLocaleString();
            listaRanking.push({
                id_pomodoro,
                fase,
                sentado,
                parado,
                fecha_inicio,
                fecha_fin
            });
        });

    // console.log(listaRanking);

    res.send(listaRanking);
}

export const filtrarDataPorIdPomodoro = async (req, res) =>
{
    const id_usuario = req.params.id;
    console.log(id_usuario);
    const [rows] = await pool.query("SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = ?", [ id_usuario ]);
    
    let idsPomodoros = rows.filter((item, index) => {
        return rows.findIndex(obj => obj.id_pomodoro === item.id_pomodoro) === index;
    });

    let idsPomodoros2 = idsPomodoros.map((item) => {
        return item.id_pomodoro;
    });

    // console.log(idsPomodoros2);

    res.send(idsPomodoros2);
}

export const rankingIndividual = async (req, res) =>
{
    // SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = 16
    const [rowsa] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id_usuario = rowsa[0].id;
    const [rows4] = await pool.query("SELECT idPomodoro FROM login WHERE id = 1;");
    const id_pomodoro = rows4[0].idPomodoro;
    // console.log(id_pomodoro);
    const [rows] = await pool.query("SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = ? AND id_pomodoro = ?", [ id_usuario, id_pomodoro]);
    
    let fasesPomodoro = rows.map((item) => {
        return item.fase_pomodoro;
    });

    let fasesPomodoroReducido = fasesPomodoro.filter((item, index) => {
        return fasesPomodoro.findIndex(obj => obj === item) === index;
    });

    
    let listaRanking = [];

        fasesPomodoroReducido.forEach(idFase => {
            // console.log("idFase: " + idFase);
            let fase = idFase;
            let sentado = 0;
            let parado = 0;
            let data = [];

            rows.forEach(element => {
                if(element.fase_pomodoro == idFase)
                {
                    data.push(element);
                    if(element.estado == 1)
                    {
                        sentado++;
                    }
                    else
                    {
                        parado++;
                    }
                }
            });

            let fecha_inicio = new Date(data[0].tiempo).toLocaleString();
            let fecha_fin = new Date(data[data.length-1].tiempo).toLocaleString();
            listaRanking.push({
                id_pomodoro,
                fase,
                sentado,
                parado,
                fecha_inicio,
                fecha_fin
            });
        });

    // console.log(listaRanking);

    res.send(listaRanking);
}

export const filtrarDataPorUsuarioIdPomodoro = async (req, res) =>
{
    // SELECT tiempo, estado FROM datos WHERE id_usuario = 16
    const id_usuario = req.params.id;
    const id_pomodoro = req.params.idPm;
    console.log(id_usuario);
    console.log(id_pomodoro);
    const [rows] = await pool.query("SELECT tiempo, estado FROM datos WHERE id_usuario = ? AND id_pomodoro = ?", [ id_usuario, id_pomodoro ]);
    // res.send(rows);

    let stateInicial = rows[0].estado;

    let date = new Date(rows[0].tiempo);   
    let array = [];

    let p = {
        "fecha_inicio": date.toLocaleString(),
        "fecha_fin": "",
        "estado": stateInicial
    }

    rows.forEach(element => {
        if(stateInicial != element.estado)
        {
            p.fecha_fin = new Date(element.tiempo).toLocaleString();
            array.push(p);
            stateInicial = element.estado;
            p = {
                "fecha_inicio": new Date(element.tiempo).toLocaleString(),
                "fecha_fin": "",
                "estado": stateInicial
            }
        }
        // array.push(element.tiempo);
    });

    p.fecha_fin = new Date(rows[rows.length - 1].tiempo).toLocaleString();
    p.estado = rows[rows.length - 1].estado;
    array.push(p);

    console.log(array);

    res.send(array);
}

export const filtrarDataPorUsuarioDefault = async (req, res) =>
{
    const [rowsa] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id_usuario = rowsa[0].id;
    const [rows4] = await pool.query("SELECT idPomodoro FROM login WHERE id = 1;");
    let id_pomodoro = rows4[0].idPomodoro;
    const [rows] = await pool.query("SELECT tiempo, estado FROM datos WHERE id_usuario = ? AND id_pomodoro = ?", [ id_usuario, id_pomodoro ]);
    // res.send(rows);
    try{
    let stateInicial = rows[0].estado;

    let date = new Date(rows[0].tiempo);   
    let array = [];

    let p = {
        "fecha_inicio": date.toLocaleString(),
        "fecha_fin": "",
        "estado": stateInicial
    }

    rows.forEach(element => {
        if(stateInicial != element.estado)
        {
            p.fecha_fin = new Date(element.tiempo).toLocaleString();
            array.push(p);
            stateInicial = element.estado;
            p = {
                "fecha_inicio": new Date(element.tiempo).toLocaleString(),
                "fecha_fin": "",
                "estado": stateInicial
            }
        }
        // array.push(element.tiempo);
    });

    p.fecha_fin = new Date(rows[rows.length - 1].tiempo).toLocaleString();
    p.estado = rows[rows.length - 1].estado;
    array.push(p);

    console.log(array);

    res.send(array);
    }catch(err){
        res.send([])
    }
}

export const totalPomodorosDefault = async (req, res) =>
{
    // SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = 16
    const [rowsa] = await pool.query("SELECT MAX(id_usuario) AS id FROM configuracion;");
    const id_usuario = rowsa[0].id;
    const [rows4] = await pool.query("SELECT idPomodoro FROM login WHERE id = 1;");
    const id_pomodoro = rows4[0].idPomodoro;
    console.log(id_pomodoro);
    const [rows] = await pool.query("SELECT tiempo, estado, fase_pomodoro, id_pomodoro FROM datos WHERE id_usuario = ? AND id_pomodoro = ?", [ id_usuario, id_pomodoro]);
    try{
    let fasesPomodoro = rows.map((item) => {
        return item.fase_pomodoro;
    });

    let fasesPomodoroReducido = fasesPomodoro.filter((item, index) => {
        return fasesPomodoro.findIndex(obj => obj === item) === index;
    });

    
    let listaRanking = [];

        fasesPomodoroReducido.forEach(idFase => {
            // console.log("idFase: " + idFase);
            let fase = idFase;
            let sentado = 0;
            let parado = 0;
            let data = [];

            rows.forEach(element => {
                if(element.fase_pomodoro == idFase)
                {
                    data.push(element);
                    if(element.estado == 1)
                    {
                        sentado++;
                    }
                    else
                    {
                        parado++;
                    }
                }
            });

            let fecha_inicio = new Date(data[0].tiempo).toLocaleString();
            let fecha_fin = new Date(data[data.length-1].tiempo).toLocaleString();
            listaRanking.push({
                id_pomodoro,
                fase,
                sentado,
                parado,
                fecha_inicio,
                fecha_fin
            });
        });

    // console.log(listaRanking);

    res.send(listaRanking);
    }catch(err){
        res.send([]);
    }
}