"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HEADER (통통 튀는 디자인) ================= */}
      <header className="fixed top-0 w-full bg-gradient-to-r from-pink-600/80 via-purple-600/80 to-indigo-600/80 backdrop-blur-lg z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl tracking-wide text-white">
            Dear Idol
          </h1>
          <nav className="hidden md:flex gap-8 text-sm text-white/90">
            <a href="#about" className="hover:scale-110 transition">About</a>
            <a href="#rewards" className="hover:scale-110 transition">Rewards</a>
            <a href="#updates" className="hover:scale-110 transition">Updates</a>
            <a href="#trailer" className="hover:scale-110 transition">Trailer</a>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">

        {/* 캐릭터 배경 */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
        >
          <Image
            src="/dearidol-hero.jpg"
            alt="Dear Idol Hero"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-7xl font-extrabold text-pink-400">
            PRODUCE YOUR STAR
          </h2>
          <p className="mt-6 opacity-80 max-w-xl mx-auto">
            당신만의 아이돌을 육성하고 최고의 무대를 완성하세요.
          </p>

          {/* 다운로드 버튼 */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#">
              <Image src="/googleplay.png" alt="Google Play" width={180} height={60} />
            </a>
            <a href="#">
              <Image src="/appstore.png" alt="App Store" width={180} height={60} />
            </a>
          </div>
        </div>

      </section>

      {/* ================= ABOUT + GAMEPLAY ================= */}
      <section id="about" className="py-32 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-pink-400 mb-8">
            About The Game
          </h3>

          <p className="opacity-70 text-lg leading-relaxed mb-12">
            Dear Idol은 감성과 전략이 결합된 차세대 아이돌 프로듀싱 게임입니다.
            트레이닝 시스템, 무대 연출 커스터마이징, 팬 관리 전략을 통해
            당신만의 스타를 성장시킬 수 있습니다.
          </p>

          <div className="grid md:grid-cols-3 gap-10 text-left">

            <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
              <h4 className="font-semibold text-pink-400 mb-3">Training System</h4>
              <p className="opacity-60 text-sm">
                스킬 트리 기반 성장 시스템으로 아이돌의 능력을 전략적으로 설계하세요.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
              <h4 className="font-semibold text-pink-400 mb-3">Stage Production</h4>
              <p className="opacity-60 text-sm">
                조명, 무대, 의상까지 직접 커스터마이징하여 최고의 퍼포먼스를 완성하세요.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
              <h4 className="font-semibold text-pink-400 mb-3">Fan Management</h4>
              <p className="opacity-60 text-sm">
                팬 커뮤니케이션 전략을 통해 글로벌 스타로 성장하세요.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRE-REGISTRATION ================= */}
      <section id="rewards" className="py-32 px-6 border-t border-white/10 text-center">
        <h3 className="text-4xl font-bold text-pink-400 mb-12">
          Pre-registration Rewards
        </h3>

        <div className="space-y-6 opacity-70 text-lg">
          <p>10,000 Registrations – Exclusive Costume</p>
          <p>50,000 Registrations – Premium Currency</p>
          <p>100,000 Registrations – Limited Idol Card</p>
        </div>
      </section>

      {/* ================= LATEST UPDATES ================= */}
      <section id="updates" className="py-32 px-6 border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400 text-center mb-16">
          Latest Updates
        </h3>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
            <h4 className="font-semibold mb-2">2025.03 – Pre-registration Open</h4>
            <p className="opacity-60 text-sm">
              글로벌 사전예약이 시작되었습니다.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
            <h4 className="font-semibold mb-2">2025.02 – Gameplay Trailer Released</h4>
            <p className="opacity-60 text-sm">
              공식 트레일러 영상이 공개되었습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TRAILER ================= */}
      <section id="trailer" className="py-32 px-6 border-t border-white/10 text-center">
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

    </main>
  );
}