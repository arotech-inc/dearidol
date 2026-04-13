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

  return (
    <main className="bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden">

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

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
          className="relative z-10 text-center px-6"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-sm md:text-base text-pink-400/70 tracking-[0.3em] uppercase font-semibold mb-4"
          >
            K-POP Production & Social Rhythm Game
          </motion.p>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-extrabold text-pink-400 mb-4"
          >
            PRODUCE YOUR STAR
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-white/50 text-base md:text-lg max-w-xl mx-auto"
          >
            나만의 K-POP 프로덕션을 운영하고<br className="hidden md:block" />
            아이돌을 육성 · 스타일링 · 연출하세요
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-110 transition cursor-pointer"
            >
              사전예약 바로가기
            </button>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"
              className="inline-block transition duration-300 hover:scale-110 hover:-translate-y-1 hover:drop-shadow-[0_0_25px_rgba(236,72,153,0.7)]">
              <Image src="/googleplay.png" alt="Google Play" width={180} height={60} />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer"
              className="inline-block transition duration-300 hover:scale-110 hover:-translate-y-1 hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">
              <Image src="/appstore.png" alt="App Store" width={180} height={60} />
            </a>
          </motion.div>
        </motion.div>

        {/* 스크롤 힌트 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* ================= NEWS ================= */}
      <section id="news" className="snap-section h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-black via-purple-950/50 to-black">
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-2">News & Events</p>
              <h3 className="text-4xl font-bold text-pink-400">Latest Updates</h3>
            </div>
            <Link href="/news" className="text-sm bg-white/10 px-5 py-2.5 rounded-full hover:bg-pink-500/20 hover:border-pink-500/40 border border-white/10 transition">
              더보기 →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* 왼쪽 이미지 */}
            <div
              onClick={() => router.push(`/news/${newsData[activeNews].slug}`)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.15)]"
            >
              {newsData.map((item, i) => (
                <Image key={item.slug} src={item.image} alt={item.title} fill
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${activeNews === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-5 left-5">
                <span className="inline-block px-3 py-1.5 bg-pink-500/90 backdrop-blur text-white text-xs font-bold rounded-full">공지사항</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-pink-400 text-xs font-semibold mb-2">{newsData[activeNews].date}</p>
                <h4 className="text-white text-2xl font-bold leading-tight group-hover:text-pink-300 transition">{newsData[activeNews].title}</h4>
              </div>
            </div>

            {/* 오른쪽 리스트 */}
            <div className="flex flex-col gap-3">
              {newsData.map((item, i) => (
                <div key={item.slug} onMouseEnter={() => setActiveNews(i)} onClick={() => router.push(`/news/${item.slug}`)}
                  className={`relative cursor-pointer rounded-xl border p-5 transition-all duration-300 group ${
                    activeNews === i ? "bg-gradient-to-r from-pink-500/15 to-purple-500/5 border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.15)]" : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-gradient-to-b from-pink-400 to-purple-500 transition-all duration-300 ${activeNews === i ? "h-12" : "h-0"}`} />
                  <div className="flex items-start justify-between gap-4 pl-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${activeNews === i ? "bg-pink-500 text-white" : "bg-white/10 text-white/60"}`}>NEWS</span>
                        <span className="text-xs text-white/40">{item.date}</span>
                      </div>
                      <h5 className={`font-semibold text-base leading-snug truncate transition ${activeNews === i ? "text-pink-300" : "text-white group-hover:text-pink-200"}`}>{item.title}</h5>
                    </div>
                    <div className={`shrink-0 self-center text-lg transition-all ${activeNews === i ? "text-pink-400 translate-x-0 opacity-100" : "text-white/30 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}>→</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHARACTERS ================= */}
      <section id="characters" className="snap-section h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-black to-purple-950/30">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div className="text-center mb-12">
            <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-3">Characters</p>
            <h3 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">당신의 아이돌을 만나보세요</h3>
            <p className="text-white/50">각 캐릭터를 클릭하면 스토리를 확인할 수 있어요</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { id: "karina", name: "카리나", role: "메인 보컬", color: "from-pink-500 to-rose-400", img: "/dearidol-feature1.jpg" },
              { id: "haru", name: "하루", role: "메인 댄서", color: "from-purple-500 to-violet-400", img: "/dearidol-feature2.jpg" },
              { id: "minseo", name: "민서", role: "래퍼", color: "from-blue-500 to-cyan-400", img: "/dearidol-feature3.jpg" },
              { id: "jiwon", name: "지원", role: "비주얼", color: "from-amber-500 to-yellow-400", img: "/dearidol-hero.png" },
            ].map((char) => (
              <Link
                key={char.id}
                href={`/characters/${char.id}`}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/40 transition duration-300 cursor-pointer aspect-[3/4]"
              >
                <Image src={char.img} alt={char.name} fill className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition duration-500" />

                {/* 역할 뱃지 */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-2.5 py-1 bg-gradient-to-r ${char.color} rounded-full text-[10px] font-bold text-white shadow-lg`}>
                    {char.role}
                  </span>
                </div>

                {/* 이름 */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xl font-bold text-white group-hover:text-pink-300 transition">{char.name}</p>
                  <p className="text-xs text-white/40 mt-1">{char.role}</p>
                </div>

                {/* View More */}
                <div className="absolute bottom-5 right-5 overflow-hidden">
                  <div className="translate-x-[120%] group-hover:translate-x-0 transition-transform duration-500 ease-out">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white text-[11px] font-semibold shadow-lg">
                      Story →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SYSTEM ================= */}
      <section id="system" className="snap-section h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-purple-950/30 to-black">
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-3">Core System</p>
            <h3 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">아이돌 산업 전체를 플레이</h3>
            <p className="text-white/50">육성 · 패션 · 리듬게임 · MV제작 · 소셜까지 하나로</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: "🏢",
                title: "프로덕션 경영",
                desc: "3D 프로덕션을 꾸미고 키워나가세요. 사무실, 연습실, 촬영실이 성장과 함께 확장됩니다.",
                color: "from-pink-500 to-rose-400",
              },
              {
                icon: "👗",
                title: "아이돌 패션",
                desc: "헤어부터 악세서리까지 파츠별 코디. 수많은 아이돌의 스타일을 직접 디자인하세요.",
                color: "from-purple-500 to-violet-400",
              },
              {
                icon: "🎵",
                title: "리듬 & 댄스카드",
                desc: "K-POP에 맞춰 댄스 카드를 전략적으로 발동! 리듬 게임과 카드 전략의 결합.",
                color: "from-blue-500 to-cyan-400",
              },
              {
                icon: "🎬",
                title: "MV 제작 & 공유",
                desc: "댄스 카드로 안무를 구성하고 카메라를 연출해 나만의 뮤직비디오를 만드세요.",
                color: "from-amber-500 to-yellow-400",
              },
            ].map((item, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition duration-300 hover:scale-[1.03] p-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition duration-300`}>
                  {item.icon}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 소셜 메타 강조 */}
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <span className="text-lg">🌍</span>
              <p className="text-sm text-white/50">다른 유저의 프로덕션을 방문하고, 서로의 아이돌 · 패션 · 공간을 구경하세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCENES ================= */}
      <section id="scenes" className="snap-section h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-black to-purple-950/20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-3">Scenes</p>
            <h3 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">인게임 장면</h3>
            <p className="text-white/50">프로덕션 운영부터 무대 위 퍼포먼스까지, Dear Idol의 세계를 미리 만나보세요</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "dearidol-feature1.jpg", label: "프로덕션 공간" },
              { img: "dearidol-feature2.jpg", label: "리듬 배틀" },
              { img: "dearidol-feature3.jpg", label: "드레스룸" },
              { img: "dearidol-hero.png", label: "무대 퍼포먼스" },
            ].map((item, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl border border-white/10 hover:border-pink-500/30 transition group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}>
                <Image src={`/${item.img}`} alt={item.label} fill className="object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[10px] text-pink-400/60 font-semibold tracking-wider mb-0.5">SCENE {String(i + 1).padStart(2, "0")}</p>
                  <p className="text-sm text-white font-semibold">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 확장성 힌트 */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["리그전 · 팀전 · 레이드", "신규 K-POP 곡 추가", "시즌 의상 이벤트", "소극장 → 돔 → 월드투어"].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/40">
                {tag}
              </span>
            ))}
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
