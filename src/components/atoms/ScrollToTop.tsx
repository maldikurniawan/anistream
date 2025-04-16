"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!showScrollToTop) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 z-40 text-white rounded-full cursor-pointer"
        >
            <FaArrowUp className="w-10 h-10 p-2 bg-[#8C00FF] rounded-full shadow-lg transition" />
        </button>
    );
}
