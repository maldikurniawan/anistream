"use client";
import React from "react";
import { Footer, Header } from "@/components";

const Trending = () => {
    return (
        <main>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                Trending
            </div>
            <Footer />
        </main>
    );
};

export default Trending;
