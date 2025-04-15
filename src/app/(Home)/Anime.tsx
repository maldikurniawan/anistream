"use client";

import { useGetData } from '@/actions';
import { Pagination } from '@/components';
import { API_URL_recent } from '@/constants';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlay } from 'react-icons/fa';

const Anime = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const getRecent = useGetData(`${API_URL_recent}?page=${currentPage}`, ["recent", currentPage], true);
    const animeData = getRecent.data || {};
    const animeList = animeData.data?.animeList || [];
    const totalPages = animeData.pagination?.totalPages;

    return (
        <div className="min-h-screen bg-[#1F1F1F] p-4 sm:px-[60px] sm:py-6 text-white">
            <div className='flex items-center gap-2 mb-4 sm:mb-6'>
                <div className='border-2 border-[#8C00FF] rounded-lg py-1 px-3 text-[#D7A7FF]'>Recent</div>
                <div className='border-2 border-[#333333] rounded-lg py-1 px-3'>Popular</div>
                <div className='border-2 border-[#333333] rounded-lg py-1 px-3'>Ongoing</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {animeList.map((anime: any) => (
                    <motion.div
                        className='rounded-xl'
                        whileHover={{ y: -10 }}
                    >
                        <Link
                            key={anime.animeId}
                            href={"/"}
                            className="group overflow-hidden transition-all duration-200"
                        >
                            <div className='relative'>
                                <img
                                    src={anime.poster}
                                    alt={anime.title}
                                    className="w-full object-cover rounded-xl"
                                />

                                {/* Overlay */}
                                <div className="absolute rounded-xl top-0 left-0 w-full h-full z-10 flex items-center justify-center">
                                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl"></div>
                                    <FaPlay className='w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10' />
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 sm:space-y-1">
                                <h2 className="font-bold text-base text-gray-300 line-clamp-1 group-hover:bg-gradient-to-tr from-[#8C00FF] to-white group-hover:text-transparent group-hover:bg-clip-text">{anime.title}</h2>
                                <p className="text-[13px] text-gray-400 flex items-center gap-2">
                                    <FaPlay className='w-[9px] h-[9px] sm:w-3 sm:h-3' />
                                    <span>Episode {anime.episodes}</span>
                                </p>
                                <p className="text-[13px] text-gray-400 flex items-center gap-2">
                                    <FaCalendarAlt className='w-3 h-3' />
                                    <span className='line-clamp-1'>Released on {anime.releasedOn}</span>
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Anime;
