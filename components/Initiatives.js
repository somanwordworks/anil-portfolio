export default function Initiatives() {
    const items = [
        {
            icon: "🤝",
            title: " Satayanrana Seva Samithi",
            desc: "Local problem-solving, citizen support and development activities."
        },
        {
            icon: "🎓",
            title: "Student Support",
            desc: "Career guidance, coaching support and educational assistance."
        },
        {
            icon: "⚕️",
            title: "Health Camps",
            desc: "Free general checkups, awareness drives and wellness programs."
        },
        {
            icon: "🌱",
            title: "Clean & Green Drives",
            desc: "Plantation campaigns, cleanliness drives and environmental awareness."
        },
        {
            icon: "🏋️‍♂️",
            title: "Youth Sports",
            desc: "Sports encouragement, skill development and team activities."
        },
        {
            icon: "📣",
            title: "Public Awareness",
            desc: "Civic awareness, rights education and social meetings."
        }
    ];

    return (
        <section id="initiatives" className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Key Initiatives</h2>
                <div className="text-sm text-slate-600">
                    Work done for the people — empowering every citizen.
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {items.map((i, idx) => (
                    <div key={idx} className="card p-5">
                        <div className="text-2xl">{i.icon}</div>
                        <h3 className="mt-3 font-semibold">{i.title}</h3>
                        <p className="mt-2 text-sm text-slate-700">{i.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
