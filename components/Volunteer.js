import { useState } from "react";
import JoinModal from "./JoinModal";   // ⬅️ import your modal

export default function Volunteer() {

    const [openModal, setOpenModal] = useState(false);

    return (
        <section id="join" className="space-y-6">

            {/* Join Modal */}
            <JoinModal open={openModal} onClose={() => setOpenModal(false)} />

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    Join  Satayanrana Seva Samithi
                </h2>
                <div className="text-sm text-slate-600">
                    Volunteer • Support • Spread the word
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

                {/* LEFT CARD */}
                <div className="card p-6">
                    <h3 className="font-semibold">Volunteer</h3>
                    <p className="mt-2 text-sm text-slate-700">
                        Join  Satayanrana Seva Samithi events, drives, and outreach programs.
                    </p>

                    {/* Button triggers modal */}
                    <button
                        onClick={() => setOpenModal(true)}
                        className="mt-4 inline-block btn-primary px-4 py-2 text-white rounded bg-[#FF9933] hover:bg-[#e27f1f]"
                    >
                        Sign up to volunteer
                    </button>
                </div>

                {/* RIGHT CARD */}
                <div className="card p-6">
                    <h3 className="font-semibold">Support</h3>
                    <p className="mt-2 text-sm text-slate-700">
                        Donate time or resources to help strengthen education and healthcare initiatives.
                    </p>
                </div>

            </div>
        </section>
    );
}
