"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newsData } from "./data";
import {
  Building2,
  Shirt,
  Music2,
  Clapperboard,
  Globe2,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Play,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [activeNews, setActiveNews] = useState(0);

  // System 비디오: 풀스크린 → 폰 모양 쉬링크
  const systemVideoRef = useRef<HTMLVideoElement>(null);
  const phoneSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: phoneProgress } = useScroll({
    target: phoneSectionRef,
    offset: ["start start", "end end"],
  });

  // 선형 보간 헬퍼
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const multiLerp = (v: number, stops: number[], values: number[]) => {
    for (let i = 0; i < stops.length - 1; i++) {
      if (v <= stops[i + 1]) {
        const t = (v - stops[i]) / (stops[i + 1] - stops[i]);
        return lerp(values[i], values[i + 1], Math.max(0, Math.min(1, t)));
      }
    }
    return values[values.length - 1];
  };

  // 풀스크린 → 베젤만 생김 → 중간 크기 → 가로 폰 (4단계)
  // vw/vh 단위로 통일해서 브라우저/스크롤바 차이에 영향 없도록
  const phoneWidth = useTransform(phoneProgress, (v) => {
    if (v <= 0.05) return "100vw";
    const vw = multiLerp(v, [0, 0.2, 0.5, 0.75, 1], [100, 96, 85, 75, 65]);
    return `max(${vw}vw, 1100px)`;
  });
  const phoneHeight = useTransform(phoneProgress, (v) => {
    if (v <= 0.05) return "100vh";
    const vw = multiLerp(v, [0, 0.2, 0.5, 0.75, 1], [100, 96, 85, 75, 65]);
    return `max(${vw * 0.52}vw, 572px)`;
  });
  const phoneRadius = useTransform(phoneProgress, (v) => {
    const r = multiLerp(v, [0, 0.2, 0.5, 0.75, 1], [0, 1, 2, 3, 3.5]);
    return `${r}vw`;
  });
  const phoneBorderW = useTransform(phoneProgress, (v) =>
    v > 0.05 ? 8 : 0
  );
  // Dynamic Island + 버튼 — 테두리 생기는 순간 한번에 나타남
  const notchOpacity = useTransform(phoneProgress, (v) =>
    v > 0.05 ? 1 : 0
  );



  // 폰 프레임의 box-shadow도 progress에 따라 (풀스크린일 땐 아무 효과 없음)
  const phoneShadow = useTransform(phoneProgress, (v) => {
    const t = Math.min(1, v / 0.2); // 20% 스크롤 시점부터 프레임 효과 full
    const highlightAlpha = 0.08 * t;
    const innerAlpha = 0.06 * t;
    const dropAlpha = 0.6 * t;
    return `0 0 0 1px rgba(255,255,255,${highlightAlpha}), 0 30px 80px rgba(0,0,0,${dropAlpha}), inset 0 0 0 1px rgba(255,255,255,${innerAlpha})`;
  });

  // 휠 스크롤을 가로채서 섹션 단위로 이동 (데스크톱 전용, Honkai 스타일)
  useEffect(() => {
    // 모바일에서는 자유 스크롤 허용
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".snap-section"));

    let isAnimating = false;
    let lockUntil = 0;

    const getCurrentIndex = (sections: HTMLElement[]) => {
      const y = window.scrollY + 2;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= y) idx = i;
      }
      return idx;
    };

    const scrollToSection = (i: number) => {
      const sections = getSections();
      if (i < 0 || i >= sections.length) return;
      isAnimating = true;
      lockUntil = Date.now() + 900;
      window.scrollTo({ top: sections[i].offsetTop, behavior: "smooth" });
      setTimeout(() => { isAnimating = false; }, 900);
    };

    const handleDelta = (deltaY: number) => {
      if (isAnimating || Date.now() < lockUntil) return true;
      if (Math.abs(deltaY) < 5) return false;

      const sections = getSections();
      if (sections.length === 0) return false;

      const currentIdx = getCurrentIndex(sections);
      const current = sections[currentIdx];
      const viewportH = window.innerHeight;
      const scrollY = window.scrollY;
      const sectionTop = current.offsetTop;
      const sectionBottom = sectionTop + current.offsetHeight;
      const tall = current.offsetHeight > viewportH + 20;

      if (tall) {
        // 긴 섹션 내부에서는 자유 스크롤 허용, 경계에서만 스냅
        if (deltaY > 0 && scrollY + viewportH < sectionBottom - 5) return false;
        if (deltaY < 0 && scrollY > sectionTop + 5) return false;
      }

      // 스냅 대상 섹션이 없으면(맨 위/아래) 네이티브 스크롤 허용 → 헤더/푸터 영역 접근 가능
      const nextIdx = currentIdx + (deltaY > 0 ? 1 : -1);
      if (nextIdx < 0 || nextIdx >= sections.length) return false;

      scrollToSection(nextIdx);
      return true;
    };

    const handleWheel = (e: WheelEvent) => {
      const snapped = handleDelta(e.deltaY);
      if (snapped) e.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <main className="bg-[#0a0a0f] text-white">

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

        {/* 비네팅 + 하단 페이드 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          className="relative z-10 px-8 w-full max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          {/* 상단 라벨 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-pink-400" />
            <span className="section-label text-pink-300">Coming 2026 · Global Release</span>
            <div className="h-px w-12 bg-pink-400" />
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] mb-4"
          >
            <span className="block text-white">PRODUCE</span>
            <span className="block gradient-text-pink">YOUR STAR</span>
          </motion.h1>

          {/* 서브 카피 */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-white/70 text-base md:text-xl font-medium tracking-wide mt-8 mb-10 px-4"
          >
            가장 화려한 피날레, 당신의 손끝에서 완성되다.
          </motion.p>

          {/* CTA 그룹 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-14"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="group relative h-14 px-8 bg-white text-black font-bold rounded-none hover:bg-pink-400 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <span>사전예약</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#scenes"
              className="group h-14 flex items-center gap-3 pl-3 pr-6 border border-white/20 hover:border-white/50 transition text-white/80 hover:text-white"
            >
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition shrink-0">
                <Play size={12} fill="currentColor" className="ml-0.5" />
              </div>
              <span className="font-bold">트레일러 보기</span>
            </a>
          </motion.div>

          {/* 스토어 뱃지 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-24 md:mb-16"
          >
            <div className="hidden md:flex items-center gap-4">
              <span className="section-label text-white/40">Available on</span>
              <div className="h-4 w-px bg-white/20" />
            </div>
            <span className="section-label text-white/40 md:hidden">Available on</span>
            <div className="flex items-center justify-center gap-3">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"
                className="transition hover:opacity-80 hover:-translate-y-0.5 duration-300">
                <Image src="/googleplay.png" alt="Google Play" width={160} height={52} className="w-[150px] md:w-[160px] h-auto" />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer"
                className="transition hover:opacity-80 hover:-translate-y-0.5 duration-300">
                <Image src="/appstore.png" alt="App Store" width={160} height={52} className="w-[150px] md:w-[160px] h-auto" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* 스크롤 힌트 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown size={18} className="text-white/40 animate-bounce" />
        </div>
      </section>

      {/* ================= NEWS ================= */}
      <section id="news" className="snap-section relative min-h-screen pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden noise-bg">
        {/* 배경 */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-end justify-between mb-10 gap-8 flex-wrap"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">01 / News</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl leading-none">
                Latest <span className="gradient-text-pink">Updates</span>
              </h2>
            </div>
            <Link href="/news" className="group flex items-center gap-2 text-sm font-medium text-white/60 hover:text-pink-400 transition">
              전체 보기
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-stretch"
          >
            {/* 왼쪽 이미지 */}
            <div
              onClick={() => router.push(`/news/${newsData[activeNews].slug}`)}
              className="relative aspect-[16/11] overflow-hidden cursor-pointer group"
            >
              {newsData.map((item, i) => (
                <Image key={item.slug} src={item.image} alt={item.title} fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={`object-cover transition-all duration-1000 ${activeNews === i ? "opacity-100 scale-100 group-hover:scale-105" : "opacity-0 scale-110"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* 프레임 라인 */}
              <div className="absolute inset-4 border border-white/10 pointer-events-none" />

              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                <span className="section-label text-white/70">Notice</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-mono-tight text-pink-400/80 text-xs mb-3">{newsData[activeNews].date}</p>
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight group-hover:text-pink-200 transition max-w-lg">
                  {newsData[activeNews].title}
                </h3>
                <div className="mt-5 inline-flex items-center gap-2 text-pink-400 text-sm font-semibold">
                  자세히 보기 <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>

            {/* 오른쪽 리스트 */}
            <div className="flex flex-col gap-0 border-t border-white/10">
              {newsData.map((item, i) => (
                <div
                  key={item.slug}
                  onMouseEnter={() => setActiveNews(i)}
                  onClick={() => router.push(`/news/${item.slug}`)}
                  className={`relative cursor-pointer py-6 border-b border-white/10 group transition-all duration-500 ${
                    activeNews === i ? "pl-6" : "pl-0 hover:pl-3"
                  }`}
                >
                  {/* 왼쪽 인디케이터 라인 */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-px bg-pink-400 transition-all duration-500 ${
                    activeNews === i ? "w-4" : "w-0"
                  }`} />

                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono-tight text-[10px] text-pink-400">#{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-xs text-white/30">{item.date}</span>
                      </div>
                      <h4 className={`text-lg font-bold leading-snug transition ${
                        activeNews === i ? "text-pink-300" : "text-white/80 group-hover:text-white"
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                    <ArrowUpRight size={18} className={`shrink-0 mt-1 transition ${
                      activeNews === i ? "text-pink-400 opacity-100" : "text-white/20 opacity-0 group-hover:opacity-100"
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SYSTEM ================= */}
      <section id="system" className="snap-section relative min-h-screen bg-[#0a0a0f]">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

        {/* 데스크톱 전용: 풀스크린 → 단계적 축소 → 가로 폰 모핑 */}
        <div ref={phoneSectionRef} className="hidden md:block relative w-full mb-0" style={{ height: "180vh", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw" }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* 폰 프레임 래퍼 (버튼은 여기에, overflow 영향 안 받음) */}
              <motion.div
                style={{
                  width: phoneWidth,
                  height: phoneHeight,
                  borderRadius: phoneRadius,
                }}
                className="relative will-change-transform shrink-0"
              >
                {/* 화면 영역 (overflow-hidden은 여기만) */}
                <motion.div
                  style={{
                    borderWidth: phoneBorderW,
                    borderStyle: "solid",
                    borderColor: "#7a8ba8",
                    borderRadius: phoneRadius,
                    boxShadow: phoneShadow,
                  }}
                  className="absolute inset-0 overflow-hidden bg-[#1a1a1e]"
                >
                  <video
                    ref={systemVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/dance.mp4" type="video/mp4" />
                  </video>

                  {/* Dynamic Island (가로 모드 — 좌측 중앙) */}
                  <motion.div
                    style={{ opacity: notchOpacity }}
                    className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[28px] h-[100px] bg-black rounded-full pointer-events-none z-10"
                  />

                  {/* 홈 인디케이터 (가로 모드 — 하단 중앙 가로 바) */}
                  <motion.div
                    style={{ opacity: notchOpacity }}
                    className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/70 rounded-full pointer-events-none z-10"
                  />

                  {/* 프레임 광택 */}
                  <motion.div
                    style={{ opacity: notchOpacity }}
                    className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
                  </motion.div>
                </motion.div>

                {/* 상단 버튼들 (가로 모드: 세로의 좌측 = 가로의 상단) */}
                <motion.div style={{ opacity: notchOpacity }} className="absolute top-[-4px] left-0 right-0 pointer-events-none z-20">
                  {/* 무음 스위치 */}
                  <div className="absolute left-[18%] h-[4px] w-[28px] bg-[#6a7b98] rounded-t-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                  {/* 볼륨 업 */}
                  <div className="absolute left-[26%] h-[4px] w-[44px] bg-[#6a7b98] rounded-t-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                  {/* 볼륨 다운 */}
                  <div className="absolute left-[36%] h-[4px] w-[44px] bg-[#6a7b98] rounded-t-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                </motion.div>

                {/* 하단 전원 버튼 (가로 모드: 세로의 우측 = 가로의 하단) */}
                <motion.div style={{ opacity: notchOpacity }} className="absolute bottom-[-4px] left-0 right-0 pointer-events-none z-20">
                  <div className="absolute right-[26%] h-[4px] w-[60px] bg-[#6a7b98] rounded-b-sm shadow-[inset_0_-1px_0_rgba(255,255,255,0.2)]" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 pt-10 md:pt-12">
          {/* 섹션 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-20 items-end mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">02 / Core System</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.9]">
                처음부터 끝까지,<br />
                <span className="gradient-text-gold">내 손으로 만든 빛</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              <span className="block mb-2">아이돌은 소유하는 것이 아니라 창조하는 것.</span>
              <span className="block">
                고퀄리티 스타일링부터 안무 구성, 카메라 연출까지—
                <br className="hidden md:inline" />
                당신이 상상하던 완벽한 스테이지를 직접 연출하세요.
              </span>
            </p>
          </motion.div>

          {/* 모바일 전용 간단 비디오 */}
          <div className="md:hidden relative aspect-video w-full overflow-hidden border border-white/10 mb-16">
            <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
              <source src="/dance.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 기능별 이미지 그리드 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                Icon: Building2,
                num: "01",
                title: "프로덕션 경영",
                desc: "3D 사무실을 꾸미고 확장하며 소속사를 성장시키세요.",
                accent: "text-pink-400",
                img: "/design.png",
                tag: "Management",
              },
              {
                Icon: Shirt,
                num: "02",
                title: "아이돌 패션",
                desc: "헤어부터 악세서리까지, 파츠 단위로 무한 코디.",
                accent: "text-purple-400",
                img: "/idol-design.png",
                tag: "Fashion",
              },
              {
                Icon: Music2,
                num: "03",
                title: "리듬 & 댄스카드",
                desc: "K-POP에 맞춰 전략적으로 카드를 발동하는 신개념 리듬게임.",
                accent: "text-cyan-400",
                img: "/dance card.png",
                tag: "Rhythm",
              },
              {
                Icon: Clapperboard,
                num: "04",
                title: "MV 제작 & 공유",
                desc: "카메라 워크와 안무를 직접 연출하는 나만의 뮤직비디오.",
                accent: "text-amber-400",
                img: "/dearidol-hero.png",
                tag: "MV Studio",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden border border-white/10 hover:border-white/30 transition duration-500 cursor-pointer"
              >
                {/* 이미지 영역 */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 group-hover:from-black/80 transition duration-500" />

                  {/* 거대 번호 */}
                  <span className="absolute top-3 right-3 font-display text-4xl text-white/20 group-hover:text-white/50 transition duration-500">
                    {item.num}
                  </span>

                  {/* 아이콘 */}
                  <div className={`absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 backdrop-blur-md bg-black/30 ${item.accent} group-hover:border-current group-hover:shadow-[0_0_25px_currentColor] transition duration-500`}>
                    <item.Icon size={20} strokeWidth={1.5} />
                  </div>

                  {/* 하단 태그 */}
                  <div className="absolute bottom-3 left-3 font-mono-tight text-[10px] text-white/70 tracking-[0.2em] uppercase">
                    {item.tag}
                  </div>
                </div>

                {/* 텍스트 영역 */}
                <div className="p-6 bg-[#0a0a0f] group-hover:bg-[#13111a] transition duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono-tight text-[10px] text-white/30">FEATURE.{item.num}</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* 소셜 강조 배너 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 p-8 md:p-10 border border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent flex items-center gap-6 flex-wrap"
          >
            <Globe2 size={36} strokeWidth={1.2} className="text-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold text-lg mb-1">Social Meta</h4>
              <p className="text-sm text-white/50">다른 유저의 프로덕션을 방문하고, 서로의 아이돌 · 패션 · 공간을 구경하세요.</p>
            </div>
            <div className="flex items-center gap-2 text-white/30 text-xs font-mono-tight">
              <Sparkles size={14} /> LIVE
            </div>
          </motion.div>

          {/* ================= 다운로드 CTA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mt-10 overflow-hidden rounded-2xl"
          >
            {/* 배경 그라데이션 + 효과 */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.3)_0%,transparent_60%)]" />

            {/* 장식 블러 */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-pink-300/30 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-purple-400/30 blur-[80px]" />

            {/* 그리드 패턴 */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* 콘텐츠 */}
            <div className="relative px-8 md:px-16 py-16 md:py-24 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="h-px w-10 bg-white/60" />
                <span className="section-label text-white/80">Now · Pre-register</span>
                <div className="h-px w-10 bg-white/60" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display text-5xl md:text-7xl leading-none text-white mb-3"
              >
                지금 <span className="text-pink-100">시작하세요</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/80 text-base md:text-lg mb-10 max-w-lg mx-auto"
              >
                사전예약하고 한정 의상, 다이아, SSR 카드까지 — Dear Idol 세계에 가장 먼저 입장하세요.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center gap-6"
              >
                {/* 메인 CTA */}
                <button
                  onClick={() => setShowPopup(true)}
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold text-base hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <span>무료로 사전예약하기</span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {/* 스토어 뱃지 */}
                <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 hover:scale-105 hover:-translate-y-0.5 drop-shadow-lg"
                  >
                    <Image src="/googleplay.png" alt="Google Play" width={160} height={52} />
                  </a>
                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 hover:scale-105 hover:-translate-y-0.5 drop-shadow-lg"
                  >
                    <Image src="/appstore.png" alt="App Store" width={160} height={52} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 준비중 팝업 ================= */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-[#13111a] border border-white/10 p-10 max-w-md w-full mx-4 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 장식 */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-pink-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles size={16} className="text-pink-400" />
                  <span className="section-label text-pink-400">Coming Soon</span>
                </div>
                <h3 className="font-display text-3xl text-white mb-4 leading-tight">
                  조금만<br />
                  <span className="gradient-text-pink">기다려주세요</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  사전예약이 오픈되면 공식 채널을 통해 가장 먼저 안내드릴게요.
                  알림을 받고 싶다면 SNS를 팔로우 해주세요.
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full py-4 bg-white text-black font-bold hover:bg-pink-400 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  확인 <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
