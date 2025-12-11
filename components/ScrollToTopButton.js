


import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-28 right-6 z-50 transition-all duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                    src="/icons/scrolltop.png"
                    alt="Scroll to top"
                    className="w-full h-full object-cover"
                />
            </div>
        </button>
    );


   

}
