"use client";
import Link from "next/link";
import { FaDiscord, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sosialFooter = {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
    discord: "#",
  };

  const socialIcons = [
    { href: sosialFooter.discord, icon: <FaDiscord /> },
    { href: sosialFooter.facebook, icon: <FaFacebookF /> },
    { href: sosialFooter.twitter, icon: <FaTwitter /> },
    { href: sosialFooter.linkedin, icon: <FaLinkedinIn /> },
    { href: sosialFooter.instagram, icon: <FaInstagram /> },
  ];

  return (
    <div className="p-4 sm:px-[60px] bg-[#1A1A1A] text-white">
      <div className="flex sm:flex-row flex-col gap-2 justify-between text-xs md:text-sm font-semibold">
        <span className="my-auto">© {currentYear} - ANIMIRU. All Rights Reserved.</span>
        <div className="flex gap-1 max-[450px]:gap-2">
          {socialIcons.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              className="p-2 sm:mx-auto my-auto rounded w-7.5 h-7.5 items-center text-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;