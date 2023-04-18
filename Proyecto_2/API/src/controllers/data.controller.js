import { pool } from '../db.js';

export const data = async (req, res) => {
    const [data] = await pool.query('SELECT * FROM sensores');
    res.json(data);
}