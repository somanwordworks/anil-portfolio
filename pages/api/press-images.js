import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const folder = path.join(process.cwd(), "public/press");

    const files = fs.readdirSync(folder);

    const images = files
        .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
        .map(f => `/press/${f}`);

    res.status(200).json(images);
}
