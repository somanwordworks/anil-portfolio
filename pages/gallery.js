import { useState } from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Gallery({ socialImages, programmeImages }) {
    const [activeTab, setActiveTab] = useState("social");
    const [lightboxImage, setLightboxImage] = useState(null);

    const images = activeTab === "social" ? socialImages : programmeImages;

    return (
        <>
            {/* GLOBAL HEADER */}
            <Header />

            <main className="min-h-screen bg-gray-50">
                {/* PAGE TITLE */}
                <section className="py-16 text-center bg-white shadow-sm">
                    <h1 className="text-4xl font-bold text-gray-800">Gallery</h1>
                    <p className="mt-3 text-gray-600">
                        Moments from our social activities and programmes
                    </p>

                    {/* TABS */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab("social")}
                            className={`px-6 py-2 rounded-full font-medium transition ${activeTab === "social"
                                    ? "bg-saffron text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Social
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("programmes")}
                            className={`px-6 py-2 rounded-full font-medium transition ${activeTab === "programmes"
                                    ? "bg-saffron text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Programmes
                        </button>


                    </div>
                </section>

                {/* GALLERY GRID */}
                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md bg-white"
                                onClick={() => setLightboxImage(src)}
                            >
                                <Image
                                    src={src}
                                    alt="Gallery image"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />

                                {/* HOVER OVERLAY */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-white text-sm">View</span>
                                </div>

                                {/* DOWNLOAD BUTTON */}
                                <a
                                    href={src}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute bottom-2 right-2 bg-white text-xs px-3 py-1 rounded shadow hover:bg-gray-100"
                                >
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* LIGHTBOX */}
                {lightboxImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <div className="relative max-w-5xl w-full">
                            <button
                                className="absolute -top-10 right-0 text-white text-3xl"
                                onClick={() => setLightboxImage(null)}
                            >
                                &times;
                            </button>

                            <img
                                src={lightboxImage}
                                alt="Full view"
                                className="w-full max-h-[90vh] object-contain rounded"
                            />

                            <a
                                href={lightboxImage}
                                download
                                className="block mt-4 text-center text-white underline"
                            >
                                Download Image
                            </a>
                        </div>
                    </div>
                )}
            </main>

            {/* GLOBAL FOOTER */}
            <Footer />
        </>
    );
}

/* 🔹 BUILD-TIME IMAGE LOADING (DYNAMIC) */
export async function getStaticProps() {
    const socialDir = path.join(process.cwd(), "public/gallery/social");
    const programmeDir = path.join(process.cwd(), "public/gallery/programmes");

    const readImages = (dir, base) =>
        fs
            .readdirSync(dir)
            .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
            .map((f) => `${base}/${f}`);

    return {
        props: {
            socialImages: readImages(socialDir, "/gallery/social"),
            programmeImages: readImages(programmeDir, "/gallery/programmes"),
        },
    };
}
