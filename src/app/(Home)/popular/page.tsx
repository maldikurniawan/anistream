"use client";
import React, { useState } from "react";
import { Footer, Header, Pagination } from "@/components";
import { API_URL_popular } from "@/constants";
import { motion } from "framer-motion";
import { useGetData } from "@/actions";
import Link from "next/link";
import { FaPlay, FaStar } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Popular = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pathname = usePathname();
    const menu = [
        { title: 'Recent', href: '/' },
        { title: 'Popular', href: '/popular' },
        { title: 'Batch', href: '/batch' },
    ];

    const getPopular = useGetData(`${API_URL_popular}?page=${currentPage}`, ["popular", currentPage], true);
    const popularData = getPopular.data || {};
    const popularList = popularData.data || [];
    const totalPages = popularData.pagination?.totalPages;

    return (
        <main>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                <div className='overflow-x-auto scroll-hidden flex justify-start mb-4 sm:mb-6'>
                    <div className='flex items-center gap-2'>
                        {menu.map((item, idx) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className={`rounded-lg py-1 px-3 border-2 transition-all duration-200
                                    ${isActive ? 'border-[#8C00FF] text-[#E3BFFF]' : 'border-[#333333] text-white hover:border-[#8C00FF] hover:text-[#E3BFFF]'}`}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                    {popularList.animeList?.map((anime: any, index: number) => (
                        <motion.div
                            key={index}
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
                                        className="w-full object-cover rounded-xl"
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
                                        <FaStar className="text-[#FFFF00]" />
                                        <span>{anime.score || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="pt-2 sm:space-y-1">
                                    <h2 className="font-bold text-base text-gray-300 line-clamp-1 group-hover:bg-gradient-to-tr from-[#8C00FF] to-white group-hover:text-transparent group-hover:bg-clip-text">{anime.title}</h2>
                                    <p className="text-[13px] text-gray-400">
                                        {anime.status}
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
            <Footer />
        </main>
    );
};

export default Popular;
