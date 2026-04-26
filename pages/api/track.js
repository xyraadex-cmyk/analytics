import { pool } from "../../lib/db";

// 🔥 Referral classifier
function classifyReferrer(referrer, utm_source, utm_medium) {
  if (utm_source || utm_medium) return "Campaign";

  if (!referrer || referrer === "direct") return "Direct";

  const ref = referrer.toLowerCase();

  if (
    ref.includes("google") ||
    ref.includes("bing") ||
    ref.includes("yahoo")
  ) return "Search";

  if (
    ref.includes("facebook") ||
    ref.includes("instagram") ||
    ref.includes("twitter") ||
    ref.includes("linkedin")
  ) return "Social";

  if (
    ref.includes("mail") ||
    ref.includes("gmail")
  ) return "Email";

  if (
    ref.includes("whatsapp") ||
    ref.includes("telegram")
  ) return "Messaging";

  return "Referral";
}

export default async function handler(req, res) {
  // ✅ CORS (IMPORTANT)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const {
      site_id,
      url,
      referrer,
      device,
      utm_source,
      utm_medium,
      utm_campaign
    } = req.body;

    try {
      const refType = classifyReferrer(referrer, utm_source, utm_medium);

      await pool.query(
        `INSERT INTO events 
        (site_id, url, referrer, ref_type, device, utm_source, utm_medium, utm_campaign) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          site_id,
          url,
          referrer,
          refType,
          device || "unknown",
          utm_source,
          utm_medium,
          utm_campaign
        ]
      );

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ error: "DB error" });
    }
  }

  return res.status(405).end();
}