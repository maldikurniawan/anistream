"use client";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaCalendar, FaFire, FaHome, FaSearch } from "react-icons/fa";
import { FaClockRotateLeft, FaXmark } from "react-icons/fa6";
import { IoIosLogIn } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import Link from "next/link";
import { PiMagnifyingGlass } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";

const Header = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const menu = [
        { title: "Home", link: "/", icon: <FaHome /> },
        { title: "Trending", link: "#", icon: <FaFire /> },
        { title: "Schedule", link: "/schedule", icon: <FaCalendar /> },
        { title: "History", link: "#", icon: <FaClockRotateLeft /> },
    ];

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
                className={`px-4 md:px-[60px] h-20 md:h-[106px] justify-between flex border-b-2 border-[#333333] items-center w-full fixed z-40 transition-all duration-300 py-0 ${scrolled
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
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center justify-between border-t-2 border-[#333333] w-full">
                        {/* Left Side - Menu */}
                        <div className="flex items-center gap-x-4">
                            {menu.map((item, itemIdx) => (
                                <Link href={item.link} key={itemIdx} className="text-white hover:text-[#D7A7FF] flex items-center gap-1 py-[9px] font-medium whitespace-nowrap text-sm cursor-pointer border-b-2 border-transparent hover:border-[#8C00FF] transition-all duration-200">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </div>
                        {/* Right Side - Authentication */}
                        <div className="flex gap-x-4">
                            <div className="text-white hover:text-[#D7A7FF] flex items-center gap-1 py-[9px] font-medium whitespace-nowrap cursor-pointer border-b-2 text-sm border-transparent hover:border-[#8C00FF] transition-all duration-200">
                                <IoIosLogIn />
                                <span>Login</span>
                            </div>
                            <div className="text-white hover:text-[#D7A7FF] flex items-center gap-1 py-[9px] font-medium whitespace-nowrap cursor-pointer border-b-2 text-sm border-transparent hover:border-[#8C00FF] transition-all duration-200">
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
                    <div className="absolute top-20 left-0 right-0 md:hidden">
                        <div className="bg-[#1A1A1A] border-b-2 border-white/10 px-4 py-2">
                            <div className="relative text-white">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <FaSearch />
                                </div>
                                <input
                                    type="text"
                                    className="bg-[#333333] text-white text-sm rounded-lg focus:ring-[#8C00FF] focus:border-[#8C00FF] block w-full ps-10 p-2"
                                    placeholder="Cari Anime"
                                />
                            </div>
                        </div>
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
                    <FaXmark className="cursor-pointer w-8 h-8 border-2 p-1 rounded-full" onClick={() => setNavOpen(false)} />
                </div>
                <div className="p-4 h-96 text-left space-y-2">
                    {menu.map((item, itemIdx) => (
                        <div key={itemIdx}>
                            <div className="px-6 py-2 flex items-center border-2 justify-between text-white hover:bg-[#333333] font-medium whitespace-nowrap cursor-pointer rounded-lg" onClick={() => setNavOpen(false)}>
                                <span>{item.title}</span>
                                {item.icon}
                            </div>
                        </div>
                    ))}
                    <div className="px-6 py-2 mt-10 flex items-center border-2 justify-between text-white hover:bg-[#333333] font-medium whitespace-nowrap cursor-pointer rounded-lg" onClick={() => setNavOpen(false)}>
                        <span>Masuk</span>
                        <IoIosLogIn />
                    </div>
                    <div className="px-6 py-2 flex items-center border-2 justify-between text-white hover:bg-[#333333] font-medium whitespace-nowrap cursor-pointer rounded-lg" onClick={() => setNavOpen(false)}>
                        <span>Daftar</span>
                        <IoPersonAddOutline />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;