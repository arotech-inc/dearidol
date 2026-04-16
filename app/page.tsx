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

  // System 비디오 스크롤 연동 (애플 스타일, 데스크톱 전용)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // System 비디오: 풀스크린 → 폰 모양 쉬링크 (데스크톱 전용)
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

  // 가로 폰 → 중간 크기 → 베젤만 → 풀스크린 (4단계)
  // vw/vh 단위로 통일해서 브라우저/스크롤바 차이에 영향 없도록
  const phoneWidth = useTransform(phoneProgress, (v) =>
    `${multiLerp(v, [0, 0.25, 0.5, 0.8, 1], [40, 58, 72, 96, 100])}vw`
  );
  const phoneHeight = useTransform(phoneProgress, (v) =>
    `${multiLerp(v, [0, 0.25, 0.5, 0.8, 1], [34, 52, 70, 94, 100])}vh`
  );
  const phoneRadius = useTransform(phoneProgress, (v) =>
    multiLerp(v, [0, 0.25, 0.5, 0.8, 1], [64, 54, 42, 24, 0])
  );
  const phoneBorderW = useTransform(phoneProgress, (v) =>
    multiLerp(v, [0, 0.25, 0.5, 0.8, 1], [24, 20, 16, 10, 0])
  );
  // Dynamic Island (휴대폰 노치) — 커질수록 사라짐
  const notchOpacity = useTransform(phoneProgress, (v) =>
    multiLerp(v, [0, 0.5, 0.7], [1, 1, 0])
  );
  const notchWidth = useTransform(phoneProgress, (v) =>
    multiLerp(v, [0, 0.7], [110, 40])
  );

  // 폰 프레임의 box-shadow — 처음에 프레임 효과 있고 풀스크린 되면 사라짐
  const phoneShadow = useTransform(phoneProgress, (v) => {
    const t = 1 - Math.min(1, Math.max(0, (v - 0.7) / 0.3)); // 70%~100% 구간에서 fade out
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
            당신의 손끝에서, K-POP 스타가 태어난다.
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
                <Image src="/googleplay.png" alt="Google Play" width={140} height={45} className="w-[120px] md:w-[140px] h-auto" />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer"
                className="transition hover:opacity-80 hover:-translate-y-0.5 duration-300">
                <Image src="/appstore.png" alt="App Store" width={140} height={45} className="w-[120px] md:w-[140px] h-auto" />
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

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 py-20 md:py-24">
          {/* 섹션 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-20 mb-10 items-end"
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
          <div className="md:hidden relative aspect-video w-full overflow-hidden border border-white/10 mb-4">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/dance.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[10px] font-mono-tight">
              <div className="flex items-center gap-2 text-white/70">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="tracking-widest uppercase">Official</span>
              </div>
              <span className="text-pink-400 tracking-widest">LIVE DEMO</span>
            </div>
          </div>

          {/* 비디오 하단 메타 정보 바 (모바일 간단 비디오용, 데스크톱에선 별도) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden items-center justify-between gap-6 py-4 px-6 mb-20 border-x border-b border-white/10 text-xs font-mono-tight text-white/40 flex-wrap"
          >
            <span>SYSTEM_OVERVIEW.MP4</span>
            <div className="flex items-center gap-6">
              <span>4 FEATURES</span>
              <span className="text-pink-400">● RECORDING</span>
            </div>
          </motion.div>

          {/* 모바일 전용 간격 */}
          <div className="md:hidden mb-16" />
        </div>

        {/* 데스크톱 전용: 풀스크린 → 단계적 축소 → 가로 폰 모핑 */}
        {isDesktop && (
          <div ref={phoneSectionRef} className="relative w-full mb-8" style={{ height: "280vh", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw" }}>
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-0">
              <motion.div
                style={{
                  width: phoneWidth,
                  height: phoneHeight,
                  borderRadius: phoneRadius,
                  borderWidth: phoneBorderW,
                  borderColor: "#3a3a3c",
                  boxShadow: phoneShadow,
                }}
                className="relative overflow-hidden bg-[#3a3a3c] will-change-transform shrink-0"
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

                {/* Dynamic Island (가로 폰에서 좌측 중앙) */}
                <motion.div
                  style={{
                    opacity: notchOpacity,
                    width: notchWidth,
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-7 bg-black rounded-full pointer-events-none z-10"
                />
              </motion.div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 -mt-4">

          {/* 메인 특징: 2열 대형 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
          >
            {[
              {
                Icon: Building2,
                num: "01",
                title: "프로덕션 경영",
                desc: "나만의 3D 프로덕션 공간을 꾸미고 확장하세요. 사무실, 연습실, 촬영실이 성장과 함께 업그레이드됩니다.",
                detail: "프로덕션이 커질수록 건물 외관이 변하고, 방문 가능한 공간이 늘어납니다.",
                accent: "pink",
                img: "/design.png",
                tag: "Management",
              },
              {
                Icon: Shirt,
                num: "02",
                title: "아이돌 패션",
                desc: "헤어, 얼굴, 상·하의, 신발, 악세서리까지 파츠별 커스터마이징. 수많은 아이돌의 코디를 직접 디자인하세요.",
                detail: "시즌·테마·콜라보 의상으로 수집 욕구를 자극하는 표현 소비 BM.",
                accent: "purple",
                img: "/idol-design.png",
                tag: "Fashion",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition duration-500 cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 group-hover:from-black/90 transition duration-500" />

                  <span className="absolute top-4 right-5 font-display text-6xl text-white/[0.07]">{item.num}</span>

                  <div className={`absolute top-5 left-5 inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 backdrop-blur-md bg-black/40 text-${item.accent}-400 group-hover:border-${item.accent}-400/50 group-hover:shadow-[0_0_30px] group-hover:shadow-${item.accent}-500/30 transition duration-500`}>
                    <item.Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="font-mono-tight text-[10px] text-white/40 tracking-[0.2em] uppercase block mb-3">{item.tag}</span>
                    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-${item.accent}-300 transition`}>{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-2 max-w-lg">{item.desc}</p>
                    <p className="text-xs text-white/30 leading-relaxed max-w-lg">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* 서브 특징: 2열 하단 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
          >
            {[
              {
                Icon: Music2,
                num: "03",
                title: "리듬 & 댄스카드",
                desc: "K-POP 음악에 맞춰 댄스 카드를 전략적으로 발동하는 신개념 리듬게임. 단순 노트가 아닌 카드 효과와 판정 타이밍의 조합.",
                detail: "팀전 · 리그전 · 레이드전 등 다양한 대전 모드 확장 예정.",
                accent: "cyan",
                img: "/dance card.png",
                tag: "Rhythm Battle",
              },
              {
                Icon: Clapperboard,
                num: "04",
                title: "MV 제작 & 공유",
                desc: "3D 댄스 모션 카드로 안무를 구성하고, 카메라 워크와 컷 전환을 직접 연출하세요. 유저가 '플레이어'이자 '크리에이터'.",
                detail: "제작한 MV를 커뮤니티에 공유하고 평가받는 소셜 콘텐츠.",
                accent: "amber",
                img: "/music-video.png",
                tag: "MV Studio",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition duration-500 cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 group-hover:from-black/90 transition duration-500" />

                  <span className="absolute top-4 right-5 font-display text-6xl text-white/[0.07]">{item.num}</span>

                  <div className={`absolute top-5 left-5 inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 backdrop-blur-md bg-black/40 text-${item.accent}-400 group-hover:border-${item.accent}-400/50 group-hover:shadow-[0_0_30px] group-hover:shadow-${item.accent}-500/30 transition duration-500`}>
                    <item.Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="font-mono-tight text-[10px] text-white/40 tracking-[0.2em] uppercase block mb-3">{item.tag}</span>
                    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-${item.accent}-300 transition`}>{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-2 max-w-lg">{item.desc}</p>
                    <p className="text-xs text-white/30 leading-relaxed max-w-lg">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* 소셜 강조 배너 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-transparent p-8 md:p-10 flex items-center gap-8 flex-wrap hover:border-pink-500/30 hover:shadow-[0_0_40px_rgba(236,72,153,0.1)] transition duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <Globe2 size={28} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-white font-bold text-xl">Social Meta</h4>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-400 text-[10px] font-bold tracking-wider">
                  <Sparkles size={10} /> LIVE
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                다른 유저의 프로덕션을 방문하고, 서로의 아이돌 · 패션 · 공간을 구경하세요.
                부러움과 과시가 자연스럽게 발생하는 — 게임이 곧 전시 공간이자 SNS.
              </p>
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
