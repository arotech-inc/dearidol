"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "System", link: "/#core" },
  { label: "Management", link: "/#management" },
  { label: "Growth", link: "/#growth" },
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

              {/* SNS 영역 */}
              <div className="px-6 py-5 border-t border-white/10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3 font-mono-tight">Follow Us</p>
                <div className="flex items-center gap-3">
                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
