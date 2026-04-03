"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "About Game", link: "/#about" },
  { label: "News", link: "/news" }, // 👈 뉴스 목록 페이지로 이동!
  { label: "Rewards", link: "/#rewards" },
  { label: "Trailer", link: "/#trailer" },
];

export default function DearIdolHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) {
      setShowMenu(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // about 섹션이 뷰포트 상단에 도달하면 메뉴 표시
        setShowMenu(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(aboutSection);

    // 스크롤 시 about 섹션을 이미 지나갔는지도 체크
    const handleScroll = () => {
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setShowMenu(rect.top <= window.innerHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 md:p-8 flex justify-between items-center md:items-start bg-black/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none"
    >
      {/* 🎀 로고 누르면 Dear Idol 메인 홈으로 */}
      <Link href="/" className="w-20 md:w-44 cursor-pointer z-50">
        <Image src="/IDOL_LOGO.png" alt="Dear Idol Logo" width={220} height={220} className="object-contain" />
      </Link>

      {/* 📱 모바일 햄버거 버튼 */}
      <AnimatePresence>
        {showMenu && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white text-3xl z-50 focus:outline-none"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* 💻 PC 오른쪽 음표 메뉴 */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex gap-12"
          >
            {menuItems.map((item, i) => (
              <Link key={i} href={item.link} className="relative group">
                <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-1 h-12 bg-pink-400"></div>
                <motion.div whileHover={{ rotate: 8 }} transition={{ duration: 0.2 }} className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.6)] cursor-pointer">
                  <span className="text-sm text-center px-3 font-semibold leading-tight text-white">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📱 모바일 드롭다운 메뉴 */}
      <AnimatePresence>
        {isMobileMenuOpen && showMenu && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-black/95 border-t border-pink-500/30 flex flex-col items-center py-8 gap-8 md:hidden shadow-2xl z-[90]">
            {menuItems.map((item, i) => (
              <Link key={i} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white hover:text-pink-400 transition">
                {item.label}
              </Link>
            ))}
            <Link href="/cs" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white hover:text-pink-400 transition">
              고객센터
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}