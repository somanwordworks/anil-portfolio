
//pages/api/tv-images.js//


import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const directory = path.join(process.cwd(), "public/about-tv");

    const files = fs.readdirSync(directory);

    const images = files
        .filter(file => /\.(png|jpe?g|svg)$/i.test(file))
        .map(file => `/about-tv/${file}`);

    res.status(200).json(images);
}
