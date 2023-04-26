import { pool } from './db.js';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        
        const emitValues = async () => {
            const [rowsa] = await pool.query("SELECT MAX(id) AS id FROM sensores;");
            const [data] = await pool.query('SELECT humedad, tmp_int, tmp_ext, pr_agua FROM sensores WHERE id = ?', [rowsa[0].id]);
            io.emit('values', data);
        }

        setInterval(emitValues, 1000);
        // emitValues();

    });
}