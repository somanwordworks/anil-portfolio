import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, area, mobile } = req.body;

    if (!name || !area || !mobile) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        // Step 1: Insert temporary row
        const insert = await pool.query(
            `INSERT INTO movement_signups (name, area, mobile)
       VALUES ($1, $2, $3)
       RETURNING id, uuid`,
            [name, area, mobile]
        );

        const row = insert.rows[0];

        // Step 2: Generate human-friendly member ID: AKY-000001
        const memberId = `AKY-${String(row.id).padStart(6, "0")}`;

        // Step 3: Update the row with member_id
        await pool.query(
            `UPDATE movement_signups
       SET member_id = $1
       WHERE id = $2`,
            [memberId, row.id]
        );

        return res.status(200).json({
            success: true,
            id: row.id,
            uuid: row.uuid,
            member_id: memberId
        });

    } catch (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: "Database error" });
    }
}
