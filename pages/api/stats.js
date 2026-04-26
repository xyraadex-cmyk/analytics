import { pool } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const ref = await pool.query(`
      SELECT ref_type, COUNT(*) as count
      FROM events
      GROUP BY ref_type
    `);

    const device = await pool.query(`
      SELECT device, COUNT(*) as count
      FROM events
      GROUP BY device
    `);

    res.json({
      ref: ref.rows,
      device: device.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}