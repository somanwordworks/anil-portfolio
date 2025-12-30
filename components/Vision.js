export default function Vision() {

    const priorities = [
        {
            icon: "🎯",
            title: "Youth Empowerment",
            desc: "Skill training, mentorship, startup support and sports development."
        },
        {
            icon: "📚",
            title: "Education & Coaching",
            desc: "Support for students, coaching centres, digital learning access."
        },
        {
            icon: "🏥",
            title: "Healthcare Outreach",
            desc: "Free camps, awareness drives, women & child health focus."
        },
        {
            icon: "🏘️",
            title: "Socail Development",
            desc: "Cleanliness, water access, local infrastructure & livelihoods."
        },
        {
            icon: "👩‍💼",
            title: "Women Empowerment",
            desc: "SHG support, safety programs and entrepreneurship training."
        },
        {
            icon: "🔎",
            title: "Transparent Leadership",
            desc: "Open communication and citizen-first governance."
        }
    ];

    return (
        <section id="vision" className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Vision & Priorities</h2>
                <div className="text-sm text-slate-600">A people-first agenda</div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {priorities.map((p, idx) => (
                    <div key={idx} className="card p-5">
                        <div className="text-2xl">{p.icon}</div>
                        <h3 className="mt-3 font-semibold">{p.title}</h3>
                        <p className="mt-2 text-sm text-slate-700">{p.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
