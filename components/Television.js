import { useState, useEffect } from "react";

export default function Television() {
    const allImages = [
        "/about-tv/1.jpg",
        "/about-tv/2.jpg",
        "/about-tv/3.jpg",
        "/about-tv/4.jpg",
        "/about-tv/5.jpg",
        "/about-tv/6.jpg",
        "/about-tv/7.jpg",
        "/about-tv/8.jpg"
    ];

    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    // ✅ Check which images exist (no 404s)
    useEffect(() => {
        const checkImages = async () => {
            const validImages = [];

            for (const img of allImages) {
                const res = await fetch(img);
                if (res.ok) validImages.push(img);
            }

            setImages(validImages);
        };

        checkImages();
    }, []);

    // Slideshow rotation
    useEffect(() => {
        if (images.length === 0) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [images]);

    return (
        <div className="relative w-full flex justify-center">

            {/* TV Frame */}
            <img
                src={images[index]}
                className="w-full h-auto max-h-[500px] object-contain rounded-xl"
                alt=""
            />


            {/* Screen Mask */}
            <div
                className="
                    absolute
                    top-[9%]
                    left-[7%]
                    w-[70%]
                    h-[82%]
                    overflow-hidden
                "
            >
                {images.length > 0 && (
                    <img
                        src={images[index]}
                        alt="Slideshow"
                        className="w-full h-full object-cover rounded-xl"
                    />
                )}
            </div>
        </div>
    );
}
