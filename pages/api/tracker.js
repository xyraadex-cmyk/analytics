import { pool } from "../../lib/db";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    const { site_id, url, referrer } = req.body;

    try {
      await pool.query(
        "INSERT INTO events (site_id, url, referrer) VALUES ($1, $2, $3)",
        [site_id, url, referrer]
      );

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "DB error" });
    }
  }

  res.status(405).end();
}