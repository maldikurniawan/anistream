"use client";
import React, { useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { Footer, Header } from "@/components";
import { useGetData } from "@/actions";
import { API_URL_schedule } from "@/constants";
import Link from "next/link";
import { FaPlay, FaRegClock, FaStar } from "react-icons/fa";

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
                <div className="text-center bg-[#1A1A1A] text-xl sm:text-3xl font-bold border-2 border-[#333333] rounded-lg py-4 mb-4 sm:mb-6">
                    {moment().locale("en").format("dddd, D MMMM YYYY")}
                </div>

                {/* Tombol hari */}
                <div className="overflow-x-auto scroll-hidden flex max-[820px]:justify-start justify-center">
                    <div className="inline-flex gap-0 mb-4 sm:mb-6">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {days
                                .find((d: any) => d.day === selectedDay)
                                ?.animeList?.map((anime: any) => (
                                    <motion.div
                                        key={anime.animeId}
                                        whileHover={{ y: -10 }}
                                    >
                                        <Link
                                            href={"/"}
                                            className="group overflow-hidden transition-all duration-300"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={anime.poster || "/noposter.jpg"}
                                                    alt={anime.title}
                                                    className="w-full h-48 object-cover rounded-xl"
                                                />

                                                {/* Overlay */}
                                                <div className="absolute rounded-xl top-0 left-0 w-full h-full z-10 flex items-center justify-center">
                                                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl"></div>
                                                    <FaPlay className='w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10' />
                                                </div>

                                                {/* Decorations */}
                                                <div className="absolute bottom-2 left-2 bg-[#8C00FF] text-sm p-1 rounded font-semibold">
                                                    {anime.type}
                                                </div>
                                                <div className="absolute bottom-2 right-2 bg-black/80 p-1 text-sm rounded font-semibold flex items-center gap-1">
                                                    <FaStar className="text-[#FFFF00]"/>
                                                    <span>{anime.score || "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="py-3 sm:py-4 sm:space-y-1">
                                                <h2 className="font-bold text-base text-gray-300 line-clamp-1 group-hover:bg-gradient-to-tr from-[#8C00FF] to-white group-hover:text-transparent group-hover:bg-clip-text">{anime.title}</h2>
                                                <p className="text-[13px] text-gray-400">
                                                    {anime.genres}
                                                </p>
                                                <p className="text-[13px] text-gray-400 flex items-center gap-1">
                                                    <FaRegClock />
                                                    <span>{anime.estimation}</span>
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
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
