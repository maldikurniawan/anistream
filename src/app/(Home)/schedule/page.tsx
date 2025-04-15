"use client";
import React from "react";
import moment from "moment";
import 'moment/locale/id';
import { Footer, Header } from "@/components"

const Schedule = () => {
    return (
        <main>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                <div className="text-center bg-[#1A1A1A] text-xl sm:text-3xl font-bold border-2 border-[#333333] rounded-lg py-4">
                    {moment().locale("id").format("dddd, D MMMM YYYY")}
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Schedule