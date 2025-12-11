import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT * FROM schedule_events ORDER BY event_date ASC"
      );

      return res.status(200).json({ events: result.rows });
    } catch (error) {
      console.error("Schedule API error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
