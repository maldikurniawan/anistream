"use client";
import React, { useState, useEffect } from "react";
import { Footer, Header } from "@/components";
import { API_URL_seasons } from "@/constants";
import { useGetData } from "@/actions";

const Trending = () => {
    const getSeasons = useGetData(API_URL_seasons, ["schedule"], true);
    const seasonsData = getSeasons?.data?.data || [];

    const filteredYears = seasonsData
        .filter((item: any) => item.year >= 2000)
        .map((item: any) => item.year);

    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const [selectedSeason, setSelectedSeason] = useState<string>("winter");
    const [seasonResult, setSeasonResult] = useState<any>(null);

    const availableSeasons = seasonsData.find((item: any) => item.year === selectedYear)?.seasons || [];

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

    console.log(seasonResult.data);

    return (
        <main>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                {/* Select Tahun */}
                <div className="flex flex-row gap-4 sm:gap-6">
                    <select
                        id="year-select"
                        className="bg-[#1A1A1A] text-white p-2 rounded-lg w-full text-center border-2 border-[#333333]"
                        style={{ WebkitAppearance: "none" }}
                        value={selectedYear ?? ""}
                        onChange={(e) => {
                            const newYear = parseInt(e.target.value);
                            const newSeasons = seasonsData.find((item: any) => item.year === newYear)?.seasons || [];

                            // Cek apakah selectedSeason masih tersedia di tahun baru
                            const validSeason = newSeasons.includes(selectedSeason) ? selectedSeason : newSeasons[0] || "";

                            setSelectedYear(newYear);
                            setSelectedSeason(validSeason);
                            setSeasonResult(null);
                        }}

                    >
                        {filteredYears.map((year: number) => (
                            <option key={year} value={year}>{year}</option>
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
                            <div>
                                Hai
                            </div>
                        ) : (
                            <p className="text-gray-400">Mengambil data...</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </main >
    );
};

export default Trending;
