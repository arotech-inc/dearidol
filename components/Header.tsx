"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "System", link: "/#core" },
  { label: "Soundtrack", link: "/#soundtrack" },
  { label: "News", link: "/news" },
  { label: "고객센터", link: "/cs" },
];

export default function DearIdolHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* 헤더 바 */}
      <div className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex justify-between items-center">
        {/* 로고 */}
        <Link
          href="/"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="w-20 md:w-32 cursor-pointer z-50"
        >
          <Image src="/IDOL_LOGO.png" alt="Dear Idol Logo" width={220} height={220} priority className="object-contain" />
        </Link>

        {/* 햄버거 버튼 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer group z-50"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* 오른쪽 슬라이드 메뉴 */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* 메뉴 패널 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-gradient-to-b from-zinc-900 to-black border-l border-white/10 z-[120] flex flex-col overflow-hidden"
            >
              {/* 메뉴 상단 */}
              <div className="px-6 pt-6 pb-5 border-b border-white/10">
                <Image src="/IDOL_LOGO.png" alt="Dear Idol" width={90} height={90} className="object-contain mb-2" />
                <p className="text-white/40 text-xs">PRODUCE YOUR STAR</p>
              </div>

              {/* 메뉴 링크 */}
              <nav className="flex-1 px-6 py-5 overflow-hidden">
                <ul className="space-y-1.5">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-3 px-4 rounded-xl text-white/80 hover:text-pink-400 hover:bg-white/5 transition group"
                      >
                        <span className="text-lg font-semibold">{item.label}</span>
                        <span className="text-white/20 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
