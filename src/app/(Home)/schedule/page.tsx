"use client";
import React, { useState } from "react";
import moment from "moment";
import { Footer, Header } from "@/components";
import { useGetData } from "@/actions";
import { API_URL_schedule } from "@/constants";

const Schedule = () => {
    const getSchedule = useGetData(API_URL_schedule, ["schedule"], true);
    const [selectedDay, setSelectedDay] = useState(moment().locale("en").format("dddd"));

    // Urutan hari dimulai dari Senin
    const order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Sort data API sesuai urutan di atas
    const days = (getSchedule?.data?.data?.days || []).sort(
        (a: any, b: any) => order.indexOf(a.day) - order.indexOf(b.day)
    );

    return (
        <main>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                <div className="text-center bg-[#1A1A1A] text-xl sm:text-3xl font-bold border-2 border-[#333333] rounded-lg py-4 mb-6">
                    {moment().locale("en").format("dddd, D MMMM YYYY")}
                </div>

                {/* Tombol hari */}
                <div className="overflow-x-auto scroll-hidden flex max-[820px]:justify-start justify-center">
                    <div className="inline-flex gap-0 mb-8">
                        {days.map((day: any, index: number) => {
                            const isFirst = index === 0;
                            const isLast = index === days.length - 1;

                            return (
                                <button
                                    key={day.day}
                                    onClick={() => setSelectedDay(day.day)}
                                    className={`px-4 py-2 whitespace-nowrap border-2 bg-[#1A1A1A] transition-colors duration-300 
                                            ${index !== 0 ? '-ml-[1px]' : ''}
                                            ${isFirst ? 'rounded-l-lg' : ''}
                                            ${isLast ? 'rounded-r-lg' : ''}
                                            ${!isFirst && !isLast ? 'rounded-none' : ''}
                                            ${selectedDay === day.day
                                            ? "bg-gradient-to-tr from-[#8C00FF] to-white text-transparent bg-clip-text border-[#8C00FF]"
                                            : "border-[#333333] hover:bg-gradient-to-tr from-[#8C00FF] to-white hover:text-transparent hover:bg-clip-text hover:border-[#8C00FF]"
                                        }`}
                                >
                                    {day.day}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Anime list */}
                {selectedDay && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {days
                                .find((d: any) => d.day === selectedDay)
                                ?.animeList?.map((anime: any) => (
                                    <a
                                        key={anime.animeId}
                                        href={anime.href}
                                        className="bg-[#2A2A2A] border border-[#333333] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <img
                                            src={anime.poster || "/noposter.jpg"}
                                            alt={anime.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-lg font-semibold mb-2 line-clamp-1">{anime.title}</h2>
                                            <p className="text-sm text-gray-400 mb-1">Tipe: {anime.type}</p>
                                            <p className="text-sm text-gray-400 mb-1">Skor: {anime.score || "N/A"}</p>
                                            <p className="text-sm text-gray-400 mb-1 line-clamp-1">Genre: {anime.genres}</p>
                                            <p className="text-sm text-gray-400">Estimasi: {anime.estimation}</p>
                                        </div>
                                    </a>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default Schedule;
