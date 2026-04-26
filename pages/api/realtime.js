import { pool } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const result = await pool.query(`
      SELECT COUNT(*) FROM events
      WHERE created_at >= NOW() - INTERVAL '1 minute'
    `);

    res.json({ active: Number(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
}