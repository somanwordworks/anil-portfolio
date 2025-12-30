import "../styles/globals.css";
import { useEffect } from "react";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {

        // -----------------------------
        // 🔒 Block Right-Click
        // -----------------------------
        document.addEventListener("contextmenu", (e) => e.preventDefault());

        // -----------------------------
        // 🔒 Disable Text Selection
        // -----------------------------
        document.addEventListener("selectstart", (e) => e.preventDefault());

    }, []);

    return (
        <>
            <Component {...pageProps} />
            <FloatingWhatsApp />
        </>
    );
}
