import { useRef, useState } from "react";

export default function Timeline() {

    const scrollRef = useRef(null);
    const [hoverImg, setHoverImg] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const steps = [
        {
            year: "1950s",
            title: "Family’s Congress legacy begins",
            desc: "Grandfather Late Maraboina Sandaiah Yadav served as Sarpanch with Congress support.",
            img: "/images/timeline/1950s-legacy.jpg"
        },
        {
            year: "Early 2000s",
            title: "Entry into NSUI",
            desc: "Inspired by family values, began political journey through NSUI in college.",
            img: "/images/timeline/2000s-nsui-entry.jpg"
        },
        {
            year: "2004",
            title: "First election involvement",
            desc: "Mobilized youth and supporters for Secunderabad MP campaign with Anjan Kumar Yadav garu.",
            img: "/images/timeline/2004-election-campaign.jpg"
        },
        {
            year: "2009",
            title: "Active role in Assembly elections",
            desc: "Worked under Shri D. Srinivas garu and CM Y.S. Rajasekhara Reddy garu in Serilingampally.",
            img: "/images/timeline/2009-serilingampally-election.jpg"
        },
        {
            year: "2009",
            title: "Statewide exposure",
            desc: "Worked with Andhra Pradesh senior leaders (local body elections).",
            img: "/images/timeline/2009-statewide-exposure.jpg"
        },
        {
            year: "2013",
            title: "General Secretary – RR District",
            desc: "Recognized for grassroots work; appointed District Congress General Secretary.",
            img: "/images/timeline/2013-general-secretary.jpg"
        },
        {
            year: "2014",
            title: "Post-Telangana commitment",
            desc: "Actively participated in TPCC movements after Congress defeat.",
            img: "/images/timeline/2014-telangana-commitment.jpg"
        },
        {
            year: "2016",
            title: "GHMC Elections",
            desc: "Led Division 106 door-to-door campaign, slum outreach, and cadre retention.",
            img: "/images/timeline/2016-ghmc-campaign.jpg"
        },
        {
            year: "2018",
            title: "Congress–TDP Alliance role",
            desc: "Worked for alliance candidate; organized Rahul Gandhi ji’s visit; coordinated with Revanth Reddy garu.",
            img: "/images/timeline/2018-alliance-campaign.jpg"
        },
        {
            year: "2023",
            title: "Vikarabad Assembly victory",
            desc: "Key role in the successful campaign of Gaddam Prasad Kumar garu.",
            img: "/images/timeline/2023-vikarabad-victory.jpg"
        },
        {
            year: "2024",
            title: "Parliament election responsibilities",
            desc: "Assigned booth management and poll coordination after meeting CM Revanth Reddy garu.",
            img: "/images/timeline/2024-parliament-responsibility.jpg"
        }
    ];


    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    };

    const handleMouseMove = (e) => {
        setCursorPos({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    return (
        <section id="journey" className="mt-16 space-y-6 relative" onMouseMove={handleMouseMove}>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Leadership Journey</h2>
                <div className="text-sm text-slate-600">
                    A lifetime of service and commitment
                </div>
            </div>

            {/* ARROWS */}
            <div className="flex justify-end space-x-3 mb-3">
                <button onClick={scrollLeft} className="px-3 py-2 bg-saffron/70 rounded shadow text-white">←</button>
                <button onClick={scrollRight} className="px-3 py-2 bg-saffron/70 rounded shadow text-white">→</button>
            </div>

            {/* HOVER IMAGE PREVIEW */}
            {hoverImg && (
                <img
                    src={hoverImg}
                    alt="preview"
                    className="fixed w-48 h-32 object-cover rounded-lg shadow-lg border border-white transition-opacity duration-200 z-50 pointer-events-none"
                    style={{ left: cursorPos.x, top: cursorPos.y }}
                />
            )}

            {/* HORIZONTAL SCROLL */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar space-x-10 pb-6 snap-x snap-mandatory scroll-smooth"
            >
                {steps.map((s, i) => (
                    <div
                        key={i}
                        className="relative snap-start flex-shrink-0 w-72"
                        onMouseEnter={() => setHoverImg(s.img)}
                        onMouseLeave={() => setHoverImg(null)}
                    >

                        {/* DOT + LINE */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-5 h-5 bg-saffron border-4 border-white rounded-full shadow"></div>
                            {i < steps.length - 1 && (
                                <div className="w-1 h-14 bg-saffron/40"></div>
                            )}
                        </div>

                        {/* CARD */}
                        <div className="mt-16 p-5 bg-white shadow-md rounded-xl border border-slate-200 hover:shadow-lg transition">
                            <div className="text-saffron font-bold text-lg">{s.year}</div>
                            <div className="font-semibold text-slate-900">{s.title}</div>
                            <div className="text-sm text-slate-700 mt-1">{s.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
