"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "News", link: "/news" },
  { label: "Characters", link: "/#characters" },
  { label: "System", link: "/#system" },
  { label: "고객센터", link: "/cs" },
];

export default function DearIdolHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState<"login" | "register" | null>(null);

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
          <Image src="/IDOL_LOGO.png" alt="Dear Idol Logo" width={220} height={220} className="object-contain" />
        </Link>

        {/* 오른쪽 버튼들 */}
        <div className="flex items-center gap-3 z-50">
          {/* 로그인 버튼 */}
          <button
            onClick={() => setShowAuth("login")}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:scale-105 transition shadow-[0_0_20px_rgba(236,72,153,0.3)] cursor-pointer"
          >
            Log In
          </button>

          {/* 햄버거 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
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
              className="fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-zinc-900 to-black border-l border-white/10 z-[120] flex flex-col"
            >
              {/* 메뉴 상단 */}
              <div className="p-8 border-b border-white/10">
                <Image src="/IDOL_LOGO.png" alt="Dear Idol" width={120} height={120} className="object-contain mb-4" />
                <p className="text-white/40 text-xs">PRODUCE YOUR STAR</p>
              </div>

              {/* 메뉴 링크 */}
              <nav className="flex-1 p-8">
                <ul className="space-y-2">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-4 px-4 rounded-xl text-white/80 hover:text-pink-400 hover:bg-white/5 transition group"
                      >
                        <span className="text-lg font-semibold">{item.label}</span>
                        <span className="text-white/20 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* 메뉴 하단 */}
              <div className="p-8 border-t border-white/10 space-y-3">
                <button
                  onClick={() => { setIsMenuOpen(false); setShowAuth("login"); }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); setShowAuth("register"); }}
                  className="w-full py-3 rounded-full border border-white/20 text-white/60 font-semibold hover:bg-white/10 transition cursor-pointer"
                >
                  Register
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 로그인 / 회원가입 모달 */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setShowAuth(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 */}
              <button onClick={() => setShowAuth(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl cursor-pointer">
                ✕
              </button>

              {/* 로고 */}
              <div className="text-center mb-6">
                <Image src="/IDOL_LOGO.png" alt="Dear Idol" width={160} height={160} className="mx-auto object-contain" />
              </div>

              {showAuth === "login" ? (
                <>
                  <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Account Log In</h2>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Username/Email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-400"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-400"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:scale-[1.02] transition shadow-lg cursor-pointer"
                    >
                      Log In
                    </button>
                  </form>
                  <div className="flex justify-between mt-4 text-sm">
                    <button className="text-pink-500 hover:underline cursor-pointer">Having Problems?</button>
                    <button onClick={() => setShowAuth("register")} className="text-pink-500 hover:underline cursor-pointer">Register Now</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Register</h2>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-400"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Verification Code"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-400"
                      />
                      <button type="button" className="px-4 py-3 text-pink-500 font-semibold text-sm hover:bg-pink-50 rounded-xl transition cursor-pointer">
                        Send
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-400"
                    />
                    <input
                      type="password"
                      placeholder="Please enter password again"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-400"
                    />
                    <div className="space-y-2 text-xs text-gray-500">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" className="mt-0.5 accent-pink-500" />
                        <span>I have read and agree to the <Link href="/terms" className="text-pink-500 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-pink-500 hover:underline">Privacy Policy</Link></span>
                      </label>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" className="mt-0.5 accent-pink-500" />
                        <span>Agree to subscribe to promotional messages (Optional)</span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:scale-[1.02] transition shadow-lg cursor-pointer"
                    >
                      Register
                    </button>
                  </form>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <button onClick={() => setShowAuth("login")} className="text-pink-500 hover:underline cursor-pointer">Log In</button>
                  </p>
                </>
              )}

              {/* 소셜 로그인 */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400 mb-4">More Login Methods</p>
                <div className="flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50 transition">G</div>
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm cursor-pointer hover:bg-gray-800 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm cursor-pointer hover:bg-blue-700 transition">f</div>
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm cursor-pointer hover:bg-gray-800 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
