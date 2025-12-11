import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "", type: "contact" });
    const [status, setStatus] = useState(null);

    async function submit(e) {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setStatus("sent");
                setForm({ name: "", email: "", mobile: "", message: "", type: "contact" });
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    }

    return (
        <section id="contact" className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Contact & Support</h2>
                <div className="text-sm text-slate-600">We welcome your message</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <form onSubmit={submit} className="card p-6 space-y-3">
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name" className="w-full border rounded px-3 py-2" />
                    <input required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="Email" className="w-full border rounded px-3 py-2" />
                    <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })}
                        placeholder="Mobile (optional)" className="w-full border rounded px-3 py-2" />
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border rounded px-3 py-2">
                        <option value="contact">General message</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="media">Media inquiry</option>
                    </select>
                    <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Message" className="w-full border rounded px-3 py-2 h-36" />
                    <div className="flex items-center gap-3">
                        <button type="submit" className="bg-congressGreen text-white px-4 py-2 rounded">Send message</button>
                        <div className="text-sm text-slate-600">
                            {status === "sending" ? "Sending..." :
                                status === "sent" ? "Thank you — message sent." :
                                    status === "error" ? "Error sending." : ""}
                        </div>
                    </div>
                </form>

                {/* CONTACT DETAILS BLOCK */}
                <aside className="card p-6">
                    <h3 className="font-semibold">Contact details</h3>

                    <p className="mt-2 text-sm text-slate-700">
                        Email: <a className="text-saffron" href="mailto:contact@akym.info">contact@akym.info</a>
                    </p>

                    {/* SOCIAL ICONS SECTION */}
                    <div className="mt-4">
                        <p className="text-sm text-slate-700 mb-2">Follow:</p>

                        <div className="flex items-center gap-4">

                            {/* FACEBOOK */}
                            <a href="https://facebook.com" target="_blank" className="hover:opacity-70 transition">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M22.675 0H1.325C.593 0 0 .6 0 1.333v21.333C0 
                23.4.593 24 1.325 24H12.82v-9.333H9.692V11.31h3.128V8.414c0-3.07 
                1.886-4.742 4.642-4.742 1.325 0 2.463.099 2.795.143v3.245h-1.918c-1.504 
                0-1.795.716-1.795 1.764v2.316h3.587l-.467 3.356h-3.12V24h6.116C23.407 
                24 24 23.4 24 22.667V1.333C24 .6 23.407 0 22.675 0z"/>
                                </svg>
                            </a>

                            {/* INSTAGRAM */}
                            <a href="https://instagram.com" target="_blank" className="hover:opacity-70 transition">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="#E1306C">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 
                0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 
                0 0 1 7.75 2zm4.25 4.5A5.25 5.25 0 1 0 17.25 11 5.25 5.25 
                0 0 0 12 6.5zm6-1.75a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 
                0 0 0-1.25-1.25z"/>
                                </svg>
                            </a>

                            {/* YOUTUBE */}
                            <a href="https://youtube.com" target="_blank" className="hover:opacity-70 transition">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF0000">
                                    <path d="M23.5 6.2a2.9 2.9 0 0 0-2-2C19.6 4 12 4 12 4s-7.6 
                0-9.5.2a2.9 2.9 0 0 0-2 2A30 30 0 0 0 0 12a30 30 0 0 
                0 .5 5.8 2.9 2.9 0 0 0 2 2C4.4 20 12 20 12 20s7.6 0 9.5-.2a2.9 
                2.9 0 0 0 2-2A30 30 0 0 0 24 12a30 30 0 0 0-.5-5.8zM9.75 
                15.5v-7l6 3.5-6 3.5z"/>
                                </svg>
                            </a>

                            {/* X / TWITTER */}
                            <a href="https://twitter.com" target="_blank" className="hover:opacity-70 transition">
                                <svg width="28" height="28" fill="black" viewBox="0 0 24 24">
                                    <path d="M18.9 2H22l-4.9 5.5L24 22h-7.1l-3.9-7.4L8.7 22H2l7.2-8.3L0 
                2h7.1l3.3 6.2L18.9 2z"/>
                                </svg>
                            </a>

                            {/* WHATSAPP */}
                            {/* <a href="https://wa.me/1234567890" target="_blank" className="hover:opacity-70 transition">
                                <svg width="28" height="28" viewBox="0 0 32 32" fill="#25D366">
                                    <path d="M16 3A13 13 0 0 0 4.3 22.2L3 29l7-1.9A13 13 0 1 0 
                16 3zm0 23a10 10 0 0 1-5-1.4l-.4-.2-4 1.1 1.1-3.9-.3-.4A10 
                10 0 1 1 16 26zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 
                1-1 1.2-.4.2-.7.1-1.4-.5-2.6-1.6-1.9-2.2-2.1-2.6.1-.6.2-.8.3-.4.5-.7c.2-.3.2-.5 
                0-.7s-.7-1.7-1-2.3-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4s-1 
                1-1 2.5 1 2.9 1.1 3.1c.1.2 2 3.4 5 4.8 3 1.3 3.3.9 3.9.8.6-.1 
                2-.9 2.3-1.8.2-.9.2-1.6.1-1.8s-.2-.2-.5-.4z"/>
                                </svg>
                            </a> */}

                        </div>
                    </div>

                </aside>
            </div>
        </section>
    );
}
