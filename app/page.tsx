"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newsData } from "./data";

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [activeNews, setActiveNews] = useState(0);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white overflow-hidden">

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

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
          className="relative z-10 text-center px-6"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-extrabold text-pink-400"
          >
            PRODUCE YOUR STAR
          </motion.h2>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-110 transition cursor-pointer"
            >
              🔥 사전예약 바로가기
            </button>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition duration-300 hover:scale-110 hover:-translate-y-1 hover:drop-shadow-[0_0_25px_rgba(236,72,153,0.7)]"
            >
              <Image src="/googleplay.png" alt="Google Play" width={180} height={60} />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition duration-300 hover:scale-110 hover:-translate-y-1 hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
            >
              <Image src="/appstore.png" alt="App Store" width={180} height={60} />
            </a>
          </motion.div>
        </motion.div>

      </section>

      {/* ================= REWARDS ================= */}
      <section id="rewards" className="py-32 px-6 text-center border-t border-white/10 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-3">Special Benefits</p>
          <h3 className="text-4xl font-bold text-pink-400 mb-4">
            Pre-registration Rewards
          </h3>
          <p className="text-white/50 mb-16">사전예약 달성 인원에 따라 보상이 해금됩니다!</p>

          <div className="max-w-3xl mx-auto space-y-5">
            {[
              { milestone: "10,000", reward: "Exclusive Costume", desc: "한정 의상 세트 지급", icon: "👗", color: "from-pink-500 to-rose-400", glow: "rgba(236,72,153,0.15)" },
              { milestone: "50,000", reward: "Premium Currency", desc: "다이아 3,000개 지급", icon: "💎", color: "from-purple-500 to-violet-400", glow: "rgba(139,92,246,0.15)" },
              { milestone: "100,000", reward: "Limited Idol Card", desc: "SSR 한정 아이돌 카드 지급", icon: "🃏", color: "from-amber-500 to-yellow-400", glow: "rgba(245,158,11,0.15)" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
              >
                {/* 카드 본체 */}
                <div className={`relative flex items-center gap-5 md:gap-6 rounded-2xl p-5 md:p-6 border border-white/10 bg-white/5 hover:border-pink-500/40 transition group cursor-default`}
                  style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 40px ${item.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`; }}
                >
                  {/* 넘버링 뱃지 */}
                  <div className="absolute top-3 right-4 text-xs font-bold text-white/10">
                    STEP {i + 1}
                  </div>

                  {/* 아이콘 */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl md:text-4xl shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition duration-300`}>
                    {item.icon}
                  </div>

                  {/* 마일스톤 */}
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[10px] md:text-xs text-white/30 font-semibold tracking-wider mb-1">MILESTONE</p>
                    <p className="text-xl md:text-2xl font-bold text-white">{item.milestone}<span className="text-xs md:text-sm text-white/30 font-normal ml-1">명 달성</span></p>
                  </div>

                  {/* 보상 */}
                  <div className="text-right shrink-0">
                    <p className="text-[10px] md:text-xs text-pink-400/40 font-semibold tracking-wider mb-1">REWARD</p>
                    <p className="text-base md:text-lg font-bold text-pink-400">{item.reward}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                {/* 연결선 */}
                {i < 2 && (
                  <div className="flex justify-center">
                    <div className="w-px h-5 bg-gradient-to-b from-white/15 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 하단 안내 */}
          <div className="mt-12 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            현재 사전예약 집계중
          </div>
        </div>
      </section>

      {/* ================= UPDATES ================= */}
      <motion.section
        id="updates"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={fadeUp}
        className="py-32 px-6 relative overflow-hidden"
      >
        {/* 배경 장식 */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-2">News & Events</p>
              <h3 className="text-4xl font-bold text-pink-400">
                Latest Updates
              </h3>
            </div>
            <Link href="/news" className="text-sm bg-white/10 px-5 py-2.5 rounded-full hover:bg-pink-500/20 hover:border-pink-500/40 border border-white/10 transition">
              더보기 →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">

            {/* 왼쪽: 큰 이미지 */}
            <div
              onClick={() => router.push(`/news/${newsData[activeNews].slug}`)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.15)]"
            >
              {newsData.map((item, i) => (
                <Image
                  key={item.slug}
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                    activeNews === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* 오버레이 그라데이션 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* 카테고리 뱃지 */}
              <div className="absolute top-5 left-5">
                <span className="inline-block px-3 py-1.5 bg-pink-500/90 backdrop-blur text-white text-xs font-bold rounded-full">
                  공지사항
                </span>
              </div>

              {/* 하단 텍스트 */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-pink-400 text-xs font-semibold mb-2">{newsData[activeNews].date}</p>
                <h4 className="text-white text-2xl font-bold leading-tight group-hover:text-pink-300 transition">
                  {newsData[activeNews].title}
                </h4>
              </div>
            </div>

            {/* 오른쪽: 리스트 */}
            <div className="flex flex-col gap-3">
              {newsData.map((item, i) => (
                <div
                  key={item.slug}
                  onMouseEnter={() => setActiveNews(i)}
                  onClick={() => router.push(`/news/${item.slug}`)}
                  className={`relative cursor-pointer rounded-xl border p-5 transition-all duration-300 group ${
                    activeNews === i
                      ? "bg-gradient-to-r from-pink-500/15 to-purple-500/5 border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.15)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {/* 좌측 인디케이터 바 */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-gradient-to-b from-pink-400 to-purple-500 transition-all duration-300 ${
                    activeNews === i ? "h-12" : "h-0"
                  }`} />

                  <div className="flex items-start justify-between gap-4 pl-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                          activeNews === i ? "bg-pink-500 text-white" : "bg-white/10 text-white/60"
                        }`}>
                          NEWS
                        </span>
                        <span className="text-xs text-white/40">{item.date}</span>
                      </div>
                      <h5 className={`font-semibold text-base leading-snug truncate transition ${
                        activeNews === i ? "text-pink-300" : "text-white group-hover:text-pink-200"
                      }`}>
                        {item.title}
                      </h5>
                    </div>

                    <div className={`shrink-0 self-center text-lg transition-all ${
                      activeNews === i ? "text-pink-400 translate-x-0 opacity-100" : "text-white/30 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}>
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </motion.section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-32 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400 mb-10">
          About The Game
        </h3>

        <p className="max-w-3xl mx-auto opacity-80 mb-16">
          감성과 전략이 결합된 차세대 아이돌 프로듀싱 게임.
          트레이닝, 무대 연출, 팬 관리까지 직접 설계하세요.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { img: "dearidol-feature1.jpg", title: "Idol", desc: "나만의 아이돌을 뽑아서 관리하세요" },
            { img: "dearidol-feature2.jpg", title: "Stage", desc: "화려한 무대 연출과 퍼포먼스를 직접 설계하세요" },
            { img: "dearidol-feature3.jpg", title: "Training", desc: "나만의 트레이닝 커리큘럼으로 아이돌을 성장시키세요" },
          ].map((item, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden hover:scale-105 transition duration-300 bg-zinc-900 border border-white/10 hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]">
              <div className="relative h-64 overflow-hidden">
                <Image src={`/${item.img}`} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold text-pink-400 mb-1">{item.title}</h4>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TRAILER ================= */}
      <section id="trailer" className="py-32 px-6 text-center border-t border-white/10 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-3">Official</p>
          <h3 className="text-4xl font-bold text-pink-400 mb-4">
            Trailer
          </h3>
          <p className="text-white/40 mb-12">Dear Idol의 세계를 미리 만나보세요</p>

          <div className="max-w-4xl mx-auto relative">
            {/* 글로우 프레임 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-sm" />
            <video controls className="relative w-full rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.15)]">
              <source src="/trailer.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ================= 준비중 팝업 ================= */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-purple-900 to-black border border-pink-500/30 rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(236,72,153,0.3)] max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎀</div>
              <h3 className="text-2xl font-bold text-pink-400 mb-2">준비중이에요!</h3>
              <p className="text-white/60 text-sm mb-6">
                사전예약 오픈 시 공지를 통해 안내드릴게요.<br />조금만 기다려주세요!
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition shadow-lg cursor-pointer"
              >
                알겠어요!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}