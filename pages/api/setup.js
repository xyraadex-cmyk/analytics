import { pool } from "../../lib/db";

export default async function handler(req, res) {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        site_id TEXT,
        url TEXT,
        referrer TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return res.status(200).json({ message: "Table created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Setup failed" });
  }
}