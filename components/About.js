import ModernSlideshow from "./ModernSlideshow";

export default function About() {

    return (
        <section id="about" className="space-y-6 w-full">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold">
                    About  Anil Kumar Yadav Maraboina
                </h2>

                <div className="text-sm text-slate-600">
                    Service • Integrity • Youth
                </div>
            </div>

            {/* FIXED: 2-column equal-height layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch w-full">

                {/* LEFT CONTENT (stretches full height) */}
                <div className="card p-6 w-full h-full">
                    <p className="text-slate-700 leading-relaxed">
                         Anil Kumar Yadav Maraboina is a youth leader driven by the belief that public life should be rooted in service. Growing up in a Public-first mission, Anil Kumar Yadav Maraboina has always remained active in grassroots work — empowering young people with skills, organising health camps, and supporting education and coaching initiatives. He believes deeply in participative leadership, transparent governance, and development that includes every section of society.
                        <br /><br />
                        Anil Kumar Yadav Maraboina hails from Serilingampally, from a strong Congress-supporting family known for its commitment to public service. His grandfather, Maraboina Bikshapati Yadav, served as a Municipal Chairman and later as an MLA, shaping the family’s longstanding connection with social welfare and public leadership. This legacy continues to inspire Anil Kumar Yadav Maraboina’s work and values.
                    </p>

                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <li>• Youth Empowerment & Skills</li>
                        <li>• Education Access & Coaching</li>
                        <li>• Health & Welfare</li>
                        <li>• Sustainable Local Development</li>
                    </ul>
                </div>

                {/* RIGHT SLIDESHOW (automatically fills same height) */}
                <aside className="flex justify-center items-stretch p-0 w-full h-full">
                    <ModernSlideshow />
                </aside>

            </div>
        </section>
    );
}
