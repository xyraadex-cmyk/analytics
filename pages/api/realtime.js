import { pool } from "../../lib/db";

export default async function handler(req, res) {
  const result = await pool.query(`
    SELECT COUNT(*) FROM events
    WHERE created_at >= NOW() - INTERVAL '1 minute'
  `);

  res.json({ active: result.rows[0].count });
}