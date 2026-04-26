import { pool } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const total = await pool.query("SELECT COUNT(*) FROM events");
    const today = await pool.query(
      "SELECT COUNT(*) FROM events WHERE created_at >= NOW() - INTERVAL '1 day'"
    );

    const sources = await pool.query(`
      SELECT referrer, COUNT(*) as count
      FROM events
      GROUP BY referrer
      ORDER BY count DESC
      LIMIT 5
    `);

    res.json({
      total: total.rows[0].count,
      today: today.rows[0].count,
      sources: sources.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}