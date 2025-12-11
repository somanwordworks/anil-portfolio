import { useState } from "react";

export default function JoinModal({ open, onClose }) {
    if (!open) return null;

    const [form, setForm] = useState({
        name: "",
        area: "",
        mobile: ""
    });

    const [status, setStatus] = useState(null);
    const [mobileError, setMobileError] = useState(null);

    // Mobile validation function
    const validateMobile = (value) => {
        const mobileRegex = /^(\+91)?[6-9]\d{9}$/;

        if (!mobileRegex.test(value)) {
            setMobileError("Enter a valid Indian mobile number");
            return false;
        } else {
            setMobileError(null);
            return true;
        }
    };

    async function submit(e) {
        e.preventDefault();

        // Prevent submit if invalid
        if (!validateMobile(form.mobile)) return;

        setStatus("sending");

        const res = await fetch("/api/movement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            setStatus("success");
            setTimeout(() => {
                onClose();
                setForm({ name: "", area: "", mobile: "+91" });
            }, 900);
        } else {
            setStatus("error");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Join Satayanrana Seva Samithi</h2>

                <form onSubmit={submit} className="space-y-3">

                    {/* Name */}
                    <input
                        required
                        placeholder="Full Name"
                        className="w-full border px-3 py-2 rounded"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />

                    {/* Area */}
                    <input
                        required
                        placeholder="Area Name (ex: Kondapur, Madhapur)"
                        className="w-full border px-3 py-2 rounded"
                        value={form.area}
                        onChange={e => setForm({ ...form, area: e.target.value })}
                    />

                    {/* MOBILE INPUT GROUP */}
                    <div className="flex gap-2">
                        <input
                            value="+91"
                            disabled
                            className="w-20 border px-3 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                        />

                        <input
                            required
                            placeholder="10-digit mobile number"
                            className="flex-1 border px-3 py-2 rounded"
                            value={form.mobile}
                            maxLength={10}
                            onChange={e => {
                                const value = e.target.value.replace(/\D/g, ""); // allow digits only
                                setForm({ ...form, mobile: value });
                                validateMobile("+91" + value);
                            }}
                        />

                    </div>

                    {mobileError && (
                        <div className="text-red-600 text-sm">{mobileError}</div>
                    )}


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={mobileError !== null}
                        className={`w-full px-4 py-2 rounded text-white 
              ${mobileError ? "bg-gray-400" : "bg-[#FF9933] hover:bg-[#e27f1f]"}`}
                    >
                        Submit
                    </button>

                    <div className="text-center text-sm text-slate-600">
                        {status === "sending" && "Submitting..."}
                        {status === "success" && "Thank you for joining!"}
                        {status === "error" && "Something went wrong."}
                    </div>
                </form>

                <button
                    onClick={onClose}
                    className="w-full mt-4 text-sm text-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
