"use client";

import { useState, useEffect } from "react";

export default function Gallery() {
    const [images, setImages] = useState([]);

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

            {/* SCROLL WRAPPER */}
            <div className="relative w-full overflow-hidden">
                {/* Desktop / Laptop – auto scroll */}
                <div className="hidden md:flex animate-scroll gap-4 min-w-max">
                    {[...images, ...images].map((src, i) => (
                        <img
                            key={`desktop-${i}`}
                            src={src}
                            alt="gallery"
                            className="h-48 w-auto object-cover rounded-xl shadow-md"
                        />
                    ))}
                </div>

                {/* Mobile / iOS / iPad – manual swipe */}
                <div className="flex md:hidden gap-4 overflow-x-auto touch-pan-x">
                    {images.map((src, i) => (
                        <img
                            key={`mobile-${i}`}
                            src={src}
                            alt="gallery"
                            className="h-48 w-auto object-cover rounded-xl shadow-md flex-shrink-0"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
