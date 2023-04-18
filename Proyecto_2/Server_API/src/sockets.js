import { pool } from './db.js';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        
        const emitValues = async () => {
            const [data] = await pool.query('SELECT * FROM sensores');
            io.emit('values', data);
        }

        setInterval(emitValues, 1000);
        // emitValues();

    });
}