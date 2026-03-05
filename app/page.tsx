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
    <main className="bg-black text-white overflow-hidden">

      {/* ================= FLOATING MUSIC NAV ================= */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="fixed top-10 right-10 z-50 flex gap-12"
      >
        {menuItems.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            variants={{
              hidden: { opacity: 0, y: -30 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* 음표 막대 */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-14 w-1 h-14 bg-pink-400"></div>

            {/* 음표 둥근 부분 */}
            <motion.div
              whileHover={{ rotate: 8 }}
              transition={{ duration: 0.2 }}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.6)]"
            >
              <span className="text-sm text-center px-3 leading-tight font-semibold">
                {item.label}
              </span>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/dearidol-hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <h2 className="text-6xl md:text-8xl font-extrabold text-pink-400">
            PRODUCE YOUR STAR
          </h2>
        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-40 px-6 text-center">
        <h3 className="text-4xl font-bold text-pink-400 mb-10">
          About The Game
        </h3>
      </section>

      {/* ================= REWARDS ================= */}
      <section id="rewards" className="py-40 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400">
          Rewards
        </h3>
      </section>

      {/* ================= UPDATES ================= */}
      <section id="updates" className="py-40 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400">
          News
        </h3>
      </section>

      {/* ================= TRAILER ================= */}
      <section id="trailer" className="py-40 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400">
          Trailer
        </h3>
      </section>

    </main>
  );
}