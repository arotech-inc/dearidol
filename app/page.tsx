"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HEADER (음표 스타일 메뉴) ================= */}
      <header className="fixed top-0 w-full bg-black/70 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl tracking-wide text-pink-400">
            Dear Idol
          </h1>
          <nav className="hidden md:flex gap-8 text-white/90">
            {["About", "Rewards", "Updates", "Trailer"].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="flex items-center gap-2 hover:text-pink-400 transition"
              >
                <span>🎵</span>
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ================= HERO (영상으로 교체) ================= */}
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

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-7xl font-extrabold text-pink-400">
            PRODUCE YOUR STAR
          </h2>
          <p className="mt-6 opacity-80 max-w-xl mx-auto">
            당신만의 아이돌을 성장시키고 최고의 무대를 완성하세요.
          </p>

          {/* 🔥 강한 사전예약 CTA */}
          <div className="mt-10">
            <a
              href="#rewards"
              className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-110 transition"
            >
              🔥 사전예약 바로가기
            </a>
          </div>

          {/* 다운로드 버튼 */}
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

      {/* ================= ABOUT + GAMEPLAY ================= */}
      <section id="about" className="py-32 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-pink-400 mb-12">
            About The Game
          </h3>

          <p className="opacity-70 text-lg mb-16 max-w-3xl mx-auto">
            Dear Idol은 감성과 전략이 결합된 차세대 아이돌 프로듀싱 게임입니다.
            트레이닝 시스템, 무대 연출 커스터마이징, 팬 관리 전략까지 직접 설계하세요.
          </p>

          <div className="grid md:grid-cols-3 gap-10">

            {["dearidol-feature1.jpg", "dearidol-feature2.jpg", "dearidol-feature3.jpg"].map((img, i) => (
              <div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:scale-105 transition">
                <div className="relative h-64">
                  <Image src={`/${img}`} alt="Feature" fill className="object-cover" />
                </div>
                <div className="p-6 opacity-70">
                  Feature Description {i + 1}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= PRE-REGISTRATION ================= */}
      <section id="rewards" className="py-32 px-6 border-t border-white/10 text-center">
        <h3 className="text-4xl font-bold text-pink-400 mb-12">
          Pre-registration Rewards
        </h3>

        <div className="space-y-6 opacity-80 text-lg">
          <p>10,000 Registrations – Exclusive Costume</p>
          <p>50,000 Registrations – Premium Currency</p>
          <p>100,000 Registrations – Limited Idol Card</p>
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
      </footer>

    </main>
  );
}