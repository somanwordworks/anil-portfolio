

//pages/api/gallery-images.js//

import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const directory = path.join(process.cwd(), "public/images/gallery");

    const files = fs.readdirSync(directory);

    const images = files
        .filter(file => /\.(png|jpe?g|svg|webp)$/i.test(file))
        .map(file => `/images/gallery/${file}`);

    res.status(200).json(images);
}
