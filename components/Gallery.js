"use client";

import { useState, useEffect } from "react";

export default function Gallery() {
    const [images, setImages] = useState([]);

    // Fetch dynamic list of images
    useEffect(() => {
        async function loadImages() {
            const res = await fetch("/api/gallery-images");
            const data = await res.json();
            setImages(data);
        }
        loadImages();
    }, []);

    return (
        <section id="gallery" className="space-y-6 overflow-hidden">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Gallery</h2>
                <div className="text-sm text-slate-600">Moments with the people</div>
            </div>

            {/* AUTO SCROLL WRAPPER */}
            <div className="relative w-full overflow-hidden">
                <div className="animate-scroll flex gap-4 w-max">
                    {[...images, ...images].map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt="gallery"
                            className="h-48 w-auto object-cover rounded-xl shadow-md"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
