"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-black text-white"
    >

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full bg-black/70 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-lg tracking-wide text-pink-400">
            Dear Idol
          </h1>
          <nav className="hidden md:flex gap-8 text-sm text-white/70">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#rewards" className="hover:text-white">Rewards</a>
            <a href="#trailer" className="hover:text-white">Trailer</a>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden pt-20">
        <Image
          src="/dearidol-hero.jpg"
          alt="Dear Idol Key Visual"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h2 className="text-5xl md:text-7xl font-extrabold text-pink-400">
            PRODUCE YOUR STAR
          </h2>
          <p className="mt-6 max-w-xl opacity-80 text-lg">
            당신만의 아이돌을 성장시키고 무대를 완성하세요.
          </p>
        </div>
      </section>

      {/* ================= STORE BUTTONS ================= */}
      <section className="py-16 px-6 text-center bg-zinc-900">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#">
            <Image
              src="/googleplay.png"
              alt="Google Play"
              width={180}
              height={60}
            />
          </a>
          <a href="#">
            <Image
              src="/appstore.png"
              alt="App Store"
              width={180}
              height={60}
            />
          </a>
        </div>
      </section>

      {/* ================= ABOUT GAME ================= */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={fadeUp}
        className="py-32 px-6 text-center border-t border-white/10"
      >
        <h3 className="text-4xl font-bold mb-8 text-pink-400">
          About The Game
        </h3>
        <p className="max-w-3xl mx-auto opacity-70 text-lg leading-relaxed">
          Dear Idol은 감성과 전략이 결합된 차세대 아이돌 프로듀싱 게임입니다.
          트레이닝, 무대 연출, 팬 관리까지 직접 설계하세요.
        </p>
      </motion.section>

      {/* ================= GAMEPLAY FEATURES ================= */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={fadeUp}
        className="py-32 px-6 border-t border-white/10"
      >
        <h3 className="text-4xl font-bold text-center mb-20 text-pink-400">
          Gameplay Features
        </h3>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

          {["dearidol-feature1.jpg", "dearidol-feature2.jpg", "dearidol-feature3.jpg"].map((img, i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:scale-105 transition">
              <div className="relative h-64">
                <Image
                  src={`/${img}`}
                  alt="Feature"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center opacity-70">
                <p>Feature Description {i + 1}</p>
              </div>
            </div>
          ))}

        </div>
      </motion.section>

      {/* ================= PRE-REGISTRATION REWARDS ================= */}
      <motion.section
        id="rewards"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={fadeUp}
        className="py-32 px-6 text-center border-t border-white/10"
      >
        <h3 className="text-4xl font-bold mb-12 text-pink-400">
          Pre-registration Rewards
        </h3>
        <div className="max-w-4xl mx-auto space-y-6 opacity-70 text-lg">
          <p>10,000 Registrations – Exclusive Costume</p>
          <p>50,000 Registrations – Premium Currency</p>
          <p>100,000 Registrations – Limited Idol Card</p>
        </div>
      </motion.section>

      {/* ================= TRAILER ================= */}
      <motion.section
        id="trailer"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={fadeUp}
        className="py-32 px-6 border-t border-white/10 text-center"
      >
        <h3 className="text-4xl font-bold mb-12 text-pink-400">
          Trailer
        </h3>

        <div className="max-w-4xl mx-auto">
          <video
            controls
            className="w-full rounded-xl"
          >
            <source src="/trailer.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.section>

      {/* ================= SNS ================= */}
      <section className="py-24 px-6 border-t border-white/10 text-center">
        <h3 className="text-3xl font-bold mb-8 text-pink-400">
          Follow Us
        </h3>
        <div className="flex justify-center gap-8 text-white/70">
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-16 px-6 border-t border-white/10 text-center bg-black">
        <a
          href="https://arotech.co.kr"
          className="text-pink-400 hover:underline"
        >
          ← Back to AROTECH
        </a>
        <p className="mt-6 text-sm opacity-60">
          © 2025 AROTECH Studio. All rights reserved.
        </p>
      </footer>

    </motion.main>
  );
}