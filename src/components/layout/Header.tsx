"use client";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation';
import { FaBars, FaCalendar, FaFire, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { FaClockRotateLeft, FaXmark } from "react-icons/fa6";
import { IoIosLogIn } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import Link from "next/link";
import { PiMagnifyingGlass } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
import { API_URL_search } from "@/constants";

type Anime = {
    title: string;
    poster: string;
    type: string;
    score: string;
    status: string;
    animeId: string;
    href: string;
    genreList: string[];
};

const Header = () => {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { width } = useWindowSize();
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [query, setQuery] = useState("");
    const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);
    const [searchOpen, setSearchOpen] = useState(false);

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const menu = [
        { title: "Home", link: "/", icon: <FaHome /> },
        { title: "Trending", link: "/trending", icon: <FaFire /> },
        { title: "Schedule", link: "/schedule", icon: <FaCalendar /> },
        { title: "History", link: "#", icon: <FaClockRotateLeft /> },
    ];

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);

        if (value.trim() === "") {
            setFilteredAnime([]);
            return;
        }

        try {
            const response = await fetch(`${API_URL_search}?q=${encodeURIComponent(value)}`);
            const json = await response.json();
            const animeList = json.data.animeList;
            const filtered = animeList.filter((anime: any) =>
                anime.title.toLowerCase().includes(value)
            );
            setFilteredAnime(filtered);
        } catch (error) {
            console.error("Error fetching data:", error);
            setFilteredAnime([]);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredAnime([]);
    };

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text; // Jika query kosong, tampilkan teks biasa

        const regex = new RegExp(`(${query})`, "gi"); // Buat regex untuk pencarian
        const parts = text.split(regex); // Pisahkan teks berdasarkan query

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="text-[#8C00FF]">{part}</span> // Bagian yang cocok berwarna ungu
            ) : (
                part
            )
        );
    };

    useOnClickOutside(ref as any, () => setNavOpen(false));

    useEffect(() => {
        if (width > 1024) {
            setNavOpen(false);
        }
    }, [width]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY >= 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`px-4 md:px-[60px] h-[76px] md:h-[106px] justify-between flex border-b-2 border-[#333333] items-center w-full fixed z-40 transition-all duration-300 py-0 ${scrolled
                    ? "shadow bg-[#1A1A1A90] backdrop-blur-xl hover:bg-[#1A1A1A]"
                    : "shadow-none bg-[#1A1A1A]"
                    }`}
            >
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-4 text-white my-3.5">
                        <Link href={"/"} className="cursor-pointer text-xl md:text-3xl font-bold bg-gradient-to-tr from-[#8C00FF] to-white text-transparent bg-clip-text">ANIMIRU</Link>
                        <div className="relative flex-1 rounded-xl hidden md:block">
                            <form className="w-full">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <FaSearch />
                                    </div>
                                    <input
                                        type="text"
                                        className="bg-[#333333] text-white text-sm rounded-lg focus:ring-[#8C00FF] focus:border-[#8C00FF] block w-full ps-10 p-1.5"
                                        placeholder="Cari Anime"
                                        value={query}
                                        onChange={handleSearch}
                                    />
                                    {query && (
                                        <div
                                            className="absolute inset-y-0 end-0 flex items-center pr-2 cursor-pointer"
                                            onClick={clearSearch}
                                        >
                                            <FaTimes />
                                        </div>
                                    )}
                                </div>
                            </form>

                            {/* Search Results */}
                            {query && (
                                <div className="absolute mt-2 bg-[#1A1A1A] border-2 border-[#333333] p-3 rounded-l-lg shadow-lg w-full max-h-[400px] overflow-y-auto">
                                    {filteredAnime.length > 0 ? (
                                        filteredAnime.map((anime) => (
                                            <Link
                                                href={"/"}
                                                key={anime.animeId}
                                                onClick={clearSearch}
                                                className="flex items-center gap-4 p-1.5 hover:bg-[#8C00FF50] rounded-lg cursor-pointer"
                                            >
                                                <img
                                                    src={anime.poster || "/noposter.jpg"}
                                                    alt={anime.title}
                                                    className="h-16 w-16 aspect-square rounded-xl"
                                                />
                                                <div>
                                                    <p className="text-white font-semibold line-clamp-1">
                                                        {highlightMatch(anime.title, query)}
                                                    </p>
                                                    <p className="text-gray-400 text-xs">
                                                        {anime.status}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-xs p-2">Anime yang dicari tidak ditemukan.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-between border-t-2 border-[#333333] w-full">
                        {/* Left Side - Menu */}
                        <div className="flex items-center gap-x-4">
                            {menu.map((item, itemIdx) => {
                                const isActive = pathname === item.link;
                                return (
                                    <Link
                                        href={item.link}
                                        key={itemIdx}
                                        className={`flex items-center gap-1 py-[9px] font-medium whitespace-nowrap text-sm cursor-pointer border-b-2 transition-all duration-300 
                                        ${isActive ? 'text-[#E3BFFF] border-[#8C00FF]' : 'text-white border-transparent hover:text-[#E3BFFF] hover:border-[#8C00FF]'}`}
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Side - Authentication */}
                        <div className="flex gap-x-4">
                            <div className="text-white hover:text-[#E3BFFF] flex items-center gap-1 py-[9px] font-medium whitespace-nowrap cursor-pointer border-b-2 text-sm border-transparent hover:border-[#8C00FF] transition-all duration-300">
                                <IoIosLogIn />
                                <span>Login</span>
                            </div>
                            <div className="text-white hover:text-[#E3BFFF] flex items-center gap-1 py-[9px] font-medium whitespace-nowrap cursor-pointer border-b-2 text-sm border-transparent hover:border-[#8C00FF] transition-all duration-300">
                                <IoPersonAddOutline />
                                <span>Register</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        className="block md:hidden text-white py-5 cursor-pointer"
                        onClick={toggleSearch}
                    >
                        {searchOpen ? (
                            <LiaTimesSolid size={36} className="border-2 border-white/10 p-2 rounded-md" />
                        ) : (
                            <PiMagnifyingGlass size={36} className="border-2 border-white/10 p-2 rounded-md" />
                        )}
                    </button>
                    <button
                        onClick={() => setNavOpen(true)}
                        className="block md:hidden text-white py-5 cursor-pointer"
                    >
                        <FaBars size={36} className="border-2 border-white/10 p-2 rounded-md" />
                    </button>
                </div>

                {/* Search Input untuk Mobile */}
                {searchOpen && (
                    <div className="absolute top-[76px] left-0 right-0 md:hidden">
                        <div className="bg-[#1A1A1A] border-b-2 border-white/10 px-4 py-2">
                            <div className="relative text-white">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <FaSearch />
                                </div>
                                <input
                                    type="text"
                                    className="bg-[#333333] text-white text-sm rounded-lg focus:ring-[#9B30FF] focus:border-[#9B30FF] block w-full ps-10 p-2"
                                    placeholder="Cari Anime"
                                    value={query}
                                    onChange={handleSearch}
                                />
                                {query && (
                                    <div
                                        className="absolute inset-y-0 end-0 flex items-center pr-2 cursor-pointer"
                                        onClick={clearSearch}
                                    >
                                        <FaTimes />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Search Results */}
                        {query && (
                            <div className="px-4">
                                <div className="mt-[-2px] bg-[#1A1A1A] border-2 border-[#333333] p-3 rounded-b-lg shadow-lg w-full max-h-[400px] overflow-y-auto">
                                    {filteredAnime.length > 0 ? (
                                        filteredAnime.map((anime) => (
                                            <Link
                                                href={"/"}
                                                key={anime.animeId}
                                                onClick={clearSearch}
                                                className="flex items-center gap-4 p-1.5 hover:bg-[#8C00FF50] rounded-lg cursor-pointer"
                                            >
                                                <img
                                                    src={anime.poster || "/noposter.jpg"}
                                                    alt={anime.title}
                                                    className="h-16 w-16 aspect-square rounded-xl"
                                                />
                                                <div>
                                                    <p className="text-white font-semibold line-clamp-1">
                                                        {highlightMatch(anime.title, query)}
                                                    </p>
                                                    <p className="text-gray-400 text-xs">
                                                        {anime.status}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-xs p-2">Anime yang dicari tidak ditemukan.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* Mobile Navigation */}
            {navOpen && <div className="fixed inset-0 bg-black/50 z-40" />}
            <div
                ref={ref}
                style={{ right: navOpen ? "0" : "-300px" }}
                className="fixed z-50 top-0 h-full min-[300px]:w-[300px] bg-[#1F1F1F] drop-shadow transition-all"
            >
                <div className="flex items-center justify-end text-white p-4">
                    <FaXmark className="cursor-pointer w-8 h-8 border-2 border-[#333333] p-1 rounded-full" onClick={() => setNavOpen(false)} />
                </div>
                <div className="p-4 h-96 text-left space-y-2">
                    {menu.map((item, itemIdx) => (
                        <Link key={itemIdx} href={item.link} className="w-full">
                            <div className="px-6 py-2 flex items-center border-2 justify-between mb-2 text-white border-[#333333] font-medium whitespace-nowrap cursor-pointer rounded-lg" onClick={() => setNavOpen(false)}>
                                <span>{item.title}</span>
                                {item.icon}
                            </div>
                        </Link>
                    ))}
                    <div className="px-6 py-2 mt-8 flex items-center border-2 justify-between text-white border-[#333333] font-medium whitespace-nowrap cursor-pointer rounded-lg" onClick={() => setNavOpen(false)}>
                        <span>Masuk</span>
                        <IoIosLogIn />
                    </div>
                    <div className="px-6 py-2 flex items-center border-2 justify-between text-white border-[#333333] font-medium whitespace-nowrap cursor-pointer rounded-lg" onClick={() => setNavOpen(false)}>
                        <span>Daftar</span>
                        <IoPersonAddOutline />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;