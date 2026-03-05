"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const menuItems = [
  { label: "About Game", link: "#about" },
  { label: "News", link: "#updates" },
  { label: "Rewards", link: "#rewards" },
  { label: "Trailer", link: "#trailer" },
];

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white overflow-hidden">

      {/* ================= FLOATING MUSIC NAV ================= */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="fixed top-8 left-8 right-8 z-50 flex justify-between items-start"
      >

        {/* 🎀 왼쪽 게임 로고 */}
        <div className="w-28">
          <Image
            src="/IDOL_LOGO.png"
            alt="Dear Idol Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* 🎵 오른쪽 음표 메뉴 */}
        <div className="flex gap-12">
          {menuItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              variants={{
                hidden: { opacity: 0, y: -20 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative group"
            >
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-1 h-12 bg-pink-400"></div>

              <motion.div
                whileHover={{ rotate: 8 }}
                transition={{ duration: 0.2 }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.6)]"
              >
                <span className="text-sm text-center px-3 font-semibold leading-tight">
                  {item.label}
                </span>
              </motion.div>
            </motion.a>
          ))}
        </div>

      </motion.div>

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/dearidol-hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-6">
          <h2 className="text-6xl md:text-8xl font-extrabold text-pink-400">
            PRODUCE YOUR STAR
          </h2>

          <div className="mt-10">
            <a
              href="#rewards"
              className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-110 transition"
            >
              🔥 사전예약 바로가기
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#">
              <Image src="/googleplay.png" alt="Google Play" width={180} height={60} />
            </a>
            <a href="#">
              <Image src="/appstore.png" alt="App Store" width={180} height={60} />
            </a>
          </div>
        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-32 px-6 text-center">
        <h3 className="text-4xl font-bold text-pink-400 mb-10">
          About The Game
        </h3>

        <p className="max-w-3xl mx-auto opacity-80 mb-16">
          감성과 전략이 결합된 차세대 아이돌 프로듀싱 게임.
          트레이닝, 무대 연출, 팬 관리까지 직접 설계하세요.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {["dearidol-feature1.jpg", "dearidol-feature2.jpg", "dearidol-feature3.jpg"].map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden hover:scale-105 transition">
              <div className="relative h-64">
                <Image src={`/${img}`} alt="Feature" fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-20 border-t border-white/10 bg-black">

        <div className="text-center mb-10">
          <a
            href="https://arotech.co.kr"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-pink-500/40 hover:bg-pink-500 hover:text-white transition"
          >
            <span className="text-xl">←</span>
            Back to AROTECH
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 text-sm opacity-70 text-center">
          <a href="#" className="hover:text-pink-400">개인정보처리방침</a>
          <a href="#" className="hover:text-pink-400">이용약관</a>
          <a href="#" className="hover:text-pink-400">고객센터</a>
        </div>

        <p className="mt-10 text-center text-xs opacity-50">
          © 2025 AROTECH Studio. All rights reserved.
        </p>

      </footer>

    </main>
  );
}