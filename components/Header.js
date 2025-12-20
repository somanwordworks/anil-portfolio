import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();
    const isSchedulePage = router.pathname === "/schedule";
    const isGalleryPage = router.pathname === "/gallery";


    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Left side - Logo + Name */}
                <div className="flex items-center gap-3 relative group">

                    {/* Small Profile Image */}
                    <img
                        src="/profile/anil.jpg"
                        alt="Anil Kumar Yadav Maraboina"
                        className="w-11 h-11 rounded-md object-cover cursor-pointer"
                    />

                    {/* Hover Preview Image */}
                    <img
                        src="/profile/anil.jpg"
                        alt="Preview"
                        className="hidden group-hover:block absolute top-12 left-0 w-40 h-40 rounded-md object-cover shadow-xl border z-50"
                    />

                    <div>
                        <div className="font-semibold"> Anil Kumar Yadav Maraboina</div>
                        <div className="text-xs text-slate-600">
                            Politician – Indian National Congress
                        </div>
                    </div>

                </div>


                {/* Right side - Navigation */}
                <nav className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 text-sm">

                    {/* HOME PAGE ONLY → full navigation */}
                    {!isSchedulePage && !isGalleryPage && (
                        <>
                            <a href="#about" className="hover:text-saffron">About</a>
                            <a href="#vision" className="hover:text-saffron">Vision</a>
                            <a href="#initiatives" className="hover:text-saffron">Initiatives</a>

                            <Link href="/gallery" className="hover:text-saffron">
                                Gallery
                            </Link>

                            <a href="#join" className="hover:text-saffron">Join</a>
                            <a href="#contact" className="hover:text-saffron">Contact</a>

                            <Link href="/schedule" className="hover:text-saffron">
                                Schedule
                            </Link>
                        </>
                    )}

                    {/* GALLERY & SCHEDULE → HOME ONLY */}
                    {(isSchedulePage || isGalleryPage) && (
                        <Link href="/" className="hover:text-saffron font-medium">
                            Home
                        </Link>
                    )}

                </nav>





            </div>
        </header>
    );
}
