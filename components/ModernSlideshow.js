"use client";

import { useState, useEffect } from "react";

export default function ModernSlideshow() {
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    // Fetch image list from API dynamically
    useEffect(() => {
        async function loadImages() {
            const res = await fetch("/api/tv-images");
            const data = await res.json();
            setImages(data);
        }
        loadImages();
    }, []);

    // Slideshow interval
    useEffect(() => {
        if (images.length === 0) return;

        const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [images]);

    if (images.length === 0)
        return <div className="w-full h-full bg-gray-200 rounded-xl" />;

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl shadow-xl">
            <img
                src={images[index]}
                alt="Slideshow"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            />
        </div>
    );
}
