"use client";
import React, { useState, useEffect } from "react";
import { Footer, Header } from "@/components";
import { API_URL_seasons } from "@/constants";
import { useGetData } from "@/actions";
import { FaRegClock, FaStar, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";
import { ImTv } from "react-icons/im";

const Trending = () => {
    const getSeasons = useGetData(API_URL_seasons, ["trending"], true);
    const seasonsData = getSeasons?.data?.data || [];

    const filteredYears = seasonsData
        .filter((item: any) => item.year >= 2000)
        .map((item: any) => item.year);

    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const [selectedSeason, setSelectedSeason] = useState<string>("winter");
    const [seasonResult, setSeasonResult] = useState<any>(null);

    const availableSeasons =
        seasonsData.find((item: any) => item.year === selectedYear)?.seasons || [];

    useEffect(() => {
        const fetchSeasonData = async () => {
            if (selectedYear && selectedSeason) {
                try {
                    const res = await fetch(`${API_URL_seasons}/${selectedYear}/${selectedSeason}`);
                    const json = await res.json();
                    setSeasonResult(json);
                } catch (error) {
                    console.error("Gagal fetch season detail:", error);
                    setSeasonResult(null);
                }
            }
        };

        fetchSeasonData();
    }, [selectedYear, selectedSeason]);

    return (
        <main>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                {/* Select Tahun dan Season */}
                <div className="flex flex-row gap-4 sm:gap-6">
                    <select
                        id="year-select"
                        className="bg-[#1A1A1A] text-white p-2 rounded-lg w-full text-center border-2 border-[#333333]"
                        style={{ WebkitAppearance: "none" }}
                        value={selectedYear ?? ""}
                        onChange={(e) => {
                            const newYear = parseInt(e.target.value);
                            const newSeasons =
                                seasonsData.find((item: any) => item.year === newYear)?.seasons || [];
                            const validSeason = newSeasons.includes(selectedSeason)
                                ? selectedSeason
                                : newSeasons[0] || "";

                            setSelectedYear(newYear);
                            setSelectedSeason(validSeason);
                            setSeasonResult(null);
                        }}
                    >
                        {filteredYears.map((year: number) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    <select
                        id="season-select"
                        className="bg-[#1A1A1A] text-white p-2 rounded-lg w-full text-center border-2 border-[#333333]"
                        style={{ WebkitAppearance: "none" }}
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(e.target.value)}
                    >
                        {availableSeasons.map((season: string) => (
                            <option key={season} value={season}>
                                {season.charAt(0).toUpperCase() + season.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Menampilkan hasil */}
                {selectedYear && selectedSeason && (
                    <div className="mt-4 sm:mt-6">
                        {seasonResult ? (
                            seasonResult?.data?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {seasonResult.data.map((item: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ y: -10 }}
                                        >
                                            <div className="bg-[#1A1A1A] p-4 rounded-lg border-2 border-[#333333] flex gap-4">
                                                <img
                                                    src={item.images.webp.large_image_url}
                                                    alt={item.title}
                                                    className="w-[160px] h-[256px] object-cover rounded-lg"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                                                    <p className="text-sm mb-1 text-gray-500 line-clamp-1 italic">{item.title_japanese}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="text-xs text-gray-400 flex items-center gap-1 bg-[#2A2A2A] p-0.5 px-1.5 rounded">
                                                            <FaStar className="text-[#FFFF00]" />
                                                            {item.score || "N/A"}
                                                        </span>
                                                        <span className="text-xs text-gray-400 flex items-center gap-1 bg-[#2A2A2A] p-0.5 px-1.5 rounded">
                                                            <FaVideo />
                                                            {item.episodes}
                                                        </span>
                                                        <span className="text-xs text-gray-400 flex items-center gap-1 bg-[#2A2A2A] p-0.5 px-1.5 rounded">
                                                            <ImTv />
                                                            {item.type}
                                                        </span>
                                                        <span className="text-xs text-gray-400 flex items-center line-clamp-1 gap-1 bg-[#2A2A2A] p-0.5 px-1.5 rounded">
                                                            <FaRegClock />
                                                            {item.duration}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-white line-clamp-3 mt-4 sm:mt-6">{item.synopsis}</p>
                                                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-4">
                                                        {item.genres?.map((genre: any) => (
                                                            <span
                                                                key={genre.mal_id}
                                                                className="text-xs text-gray-400 bg-[#2A2A2A] px-2 py-0.5 rounded"
                                                            >
                                                                {genre.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">Tidak ada data tersedia.</p>
                            )
                        ) : (
                            <p className="text-gray-400">Mengambil data...</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default Trending;
