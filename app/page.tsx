"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white overflow-hidden">

      {/* ================= FLOATING MUSIC HEADER ================= */}
      <header className="fixed top-6 right-6 z-50 flex gap-4">

        {[
          { label: "About", link: "#about" },
          { label: "Rewards", link: "#rewards" },
          { label: "Updates", link: "#updates" },
          { label: "Trailer", link: "#trailer" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:scale-110 transition duration-300"
          >
            <span className="text-xl">🎵</span>
          </a>
        ))}

      </header>

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

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        <div className="relative z-10 text-center px-6">
          <h2 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
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
      <section id="updates" className="py-32 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400 mb-10">
          Latest Updates
        </h3>

        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-zinc-900 p-6 rounded-xl border border-pink-500/30">
            2025.03 – Pre-registration Open
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-purple-500/30">
            2025.02 – Official Trailer Released
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-16 text-center border-t border-white/10">
        <a href="https://arotech.co.kr" className="text-pink-400 hover:underline">
          ← Back to AROTECH
        </a>
      </footer>

    </main>
  );
}