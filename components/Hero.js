import { useState } from "react";
import JoinModal from "./JoinModal";

export default function Hero() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* JOIN MODAL */}
            <JoinModal open={open} onClose={() => setOpen(false)} />

            {/* HERO SECTION */}
            <section className="hero-animated-bg relative overflow-hidden">

                {/* NOISE */}
                <div className="noise-bg pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-2 py-16 md:py-20 flex flex-col md:flex-row items-start gap-12">

                    {/* LEFT SIDE CONTENT */}
                    <div className="md:w-7/12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-black whitespace-nowrap">
                            Anil Kumar Yadav Maraboina
                        </h1>

                        <p className="mt-3 text-lg text-black/80">
                            Politician • Indian National Congress
                        </p>

                        <p className="mt-5 text-black/80">
                            Committed to empowering people, Commitment to social upliftment,
                            and building a just, progressive future — grounded in service,
                            transparency and inclusive growth.
                        </p>

                        {/* BUTTONS */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-[#FF9933] text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-[#e27f1f]"
                            >
                                Join Satayanrana Seva Samithi
                            </button>

                            <a
                                href="#contact"
                                className="border border-[#FF9933] text-[#FF9933] px-5 py-2 rounded-lg font-medium hover:bg-[#FF9933]/10"
                            >
                                Contact
                            </a>
                        </div>

                        <div className="mt-6 text-sm text-black/70">
                            Serves with humility • Society-first leadership • Service-focused governance
                        </div>
                    </div>

                    {/* RIGHT SIDE PROFILE CARD */}
                    <div className="md:w-5/12 flex justify-center">
                        <div className="card p-6 max-w-sm w-full flex flex-col items-center bg-white/85 backdrop-blur rounded-2xl shadow-lg">

                            <img
                                src="/images/profile.jpg"
                                alt="Anil Kumar Yadav"
                                className="w-72 h-72 rounded-full object-cover shadow-md"
                            />

                            <h3 className="mt-4 font-semibold text-black">Anil Kumar Yadav Maraboina </h3>
                            <p className="text-sm text-black/60"> Politician • Philanthropist </p>

                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}
