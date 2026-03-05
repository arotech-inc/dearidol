"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { newsData } from "./data";

const menuItems = [
  { label: "About Game", link: "#about" },
  { label: "News", link: "#updates" },
  { label: "Rewards", link: "#rewards" },
  { label: "Trailer", link: "#trailer" },
];

export default function Home() {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
          // 모바일에서는 배경을 살짝 어둡게, PC에서는 투명하게
          className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center md:items-start bg-black/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none"
        >
          {/* 🎀 왼쪽 게임 로고 */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-24 md:w-32 cursor-pointer z-50"
          >
            <Image
              src="/IDOL_LOGO.png"
              alt="Dear Idol Logo"
              width={180}
              height={180}
              className="object-contain"
            />
          </button>

          {/* 📱 모바일용 햄버거 버튼 (PC에선 숨김) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white text-3xl z-50 focus:outline-none"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          {/* 💻 PC 오른쪽 음표 메뉴 (모바일에선 숨김) */}
          <div className="hidden md:flex gap-12">
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
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.6)] cursor-pointer"
                >
                  <span className="text-sm text-center px-3 font-semibold leading-tight">
                    {item.label}
                  </span>
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* 📱 모바일 드롭다운 메뉴 (햄버거 버튼 누를 때만 보임) */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 w-full bg-black/95 border-t border-pink-500/30 flex flex-col items-center py-8 gap-8 md:hidden shadow-2xl"
            >
              {menuItems.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)} // 누르면 메뉴 닫힘
                  className="text-xl font-bold text-white hover:text-pink-400 transition"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
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

      {/* ================= UPDATES ================= */}
      <motion.section
        id="updates"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={fadeUp}
        className="py-32 px-6"
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-12">
          <h3 className="text-4xl font-bold text-pink-400">
            Latest Updates
          </h3>
          <button className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition">
            더보기
          </button>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {newsData.map((item, i) => (
            <div
              key={i}
              onClick={() => router.push(`/news/${item.slug}`)}
              className="cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:scale-105 transition duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-sm opacity-60 mb-2">{item.date}</p>
                <h4 className="font-semibold">{item.title}</h4>
              </div>
            </div>
          ))}

        </div>
      </motion.section>

      {/* ================= REWARDS ================= */}
      <section id="rewards" className="py-32 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400 mb-12">
          Pre-registration Rewards
        </h3>

        <div className="space-y-6 opacity-80 text-lg">
          <p>10,000 Registrations – Exclusive Costume</p>
          <p>50,000 Registrations – Premium Currency</p>
          <p>100,000 Registrations – Limited Idol Card</p>
        </div>
      </section>

      {/* ================= TRAILER ================= */}
      <section id="trailer" className="py-32 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400 mb-12">
          Trailer
        </h3>

        <div className="max-w-4xl mx-auto">
          <video controls className="w-full rounded-xl">
            <source src="/trailer.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-20 border-t border-white/10 bg-black">

        <div className="text-center mb-10">
          <a
            href="https://corporate-xi-six.vercel.app/"
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