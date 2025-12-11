import "../styles/globals.css";
import { useEffect } from "react";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // -----------------------------
        // Existing Google Translate Script
        // -----------------------------
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);

        window.googleTranslateElementInit = function () { };

        // -----------------------------
        // 🔒 Block Right-Click (Desktop)
        // -----------------------------
        document.addEventListener("contextmenu", (e) => e.preventDefault());

        // -----------------------------
        // 🔒 Disable Text Selection
        // -----------------------------
        document.addEventListener("selectstart", (e) => e.preventDefault());

        // -----------------------------
        // 🔒 Block Keyboard Shortcuts
        // -----------------------------
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            if (
                (e.ctrlKey && ["c", "v", "x", "s", "u"].includes(key)) ||
                (e.ctrlKey && e.shiftKey && ["i", "j"].includes(key)) ||
                key === "f12"
            ) {
                e.preventDefault();
            }
        });

        // -----------------------------
        // 📵 Disable Long Press Menu (Mobile)
        // -----------------------------
        const preventTouch = (e) => e.preventDefault();
        document.addEventListener("touchstart", preventTouch, { passive: false });
        document.addEventListener("touchmove", preventTouch, { passive: false });
        document.addEventListener("gesturestart", preventTouch);

        // Disable tap highlight
        const style = document.createElement("style");
        style.innerHTML = `
            * {
                -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
                user-select: none !important;
                -webkit-user-select: none !important;
            }
            img {
                -webkit-touch-callout: none !important;
            }
        `;
        document.head.appendChild(style);

        // -----------------------------
        // 📸 Disable Screenshot Attempt (Web Browser Best Effort)
        // -----------------------------
        const blurOverlay = document.createElement("div");
        blurOverlay.style.position = "fixed";
        blurOverlay.style.top = "0";
        blurOverlay.style.left = "0";
        blurOverlay.style.width = "100vw";
        blurOverlay.style.height = "100vh";
        blurOverlay.style.background = "black";
        blurOverlay.style.opacity = "0";
        blurOverlay.style.transition = "opacity 0.2s ease";
        blurOverlay.style.pointerEvents = "none";
        blurOverlay.style.zIndex = "999999";
        document.body.appendChild(blurOverlay);

        let screenshotBlocked = false;

        const blockScreenshot = () => {
            if (!screenshotBlocked) {
                screenshotBlocked = true;
                blurOverlay.style.opacity = "1";
                setTimeout(() => {
                    blurOverlay.style.opacity = "0";
                    screenshotBlocked = false;
                }, 800);
            }
        };

        // Android screenshot gesture triggers window resize
        const resizeHandler = () => {
            if (window.innerHeight < screen.height * 0.7) {
                blockScreenshot();
            }
        };

        window.addEventListener("resize", resizeHandler);

        // Cleanup
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <>
            <div id="trigger-translate" tabIndex="-1" style={{ opacity: 0, height: 0 }}></div>
            <Component {...pageProps} />
            <FloatingWhatsApp />
        </>
    );
}
