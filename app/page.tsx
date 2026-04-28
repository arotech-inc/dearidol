"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newsData } from "./data";
import {
  Building2,
  Shirt,
  Music2,
  Clapperboard,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Play,
  Users,
  Layers,
  Sofa,
  Target,
  Handshake,
  Zap,
  Flame,
  Mic2,
  Star,
  Crown,
  Palette,
  Headphones,
  Trophy,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [activeNews, setActiveNews] = useState(0);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  // 50 카운트업 (Idol Management 섹션)
  const counterRef = useRef<HTMLDivElement>(null);
  const counterInView = useInView(counterRef, { amount: 0.5 });
  const [statCount, setStatCount] = useState(1);
  useEffect(() => {
    if (!counterInView) {
      setStatCount(1);
      return;
    }
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setStatCount(Math.round(1 + (50 - 1) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [counterInView]);

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

  // Apple 스타일: 고정 크기 + transform scale 애니메이션
  // 폰은 고정 850×450px, scale만 변해서 비율이 절대 안 틀어짐
  const [scaleMax, setScaleMax] = useState(3);
  useEffect(() => {
    const compute = () => {
      // 뷰포트를 꽉 채우려면 가로/세로 중 더 큰 비율로 스케일
      const sx = window.innerWidth / 850;
      const sy = window.innerHeight / 420;
      setScaleMax(Math.max(sx, sy));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  const phoneScale = useTransform(phoneProgress, (v) => {
    // 최소 1로 하한 — 단조 감소 보장 (바운스 방지)
    const s = multiLerp(v, [0, 0.2, 0.5, 0.75, 1], [
      scaleMax,
      Math.max(scaleMax * 0.98, 1),
      Math.max(scaleMax * 0.7, 1),
      Math.max(scaleMax * 0.4, 1),
      1,
    ]);
    return s;
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
      lockUntil = Date.now() + 1400; // 섹션 도착 후 잠시 머물 수 있도록
      window.scrollTo({ top: sections[i].offsetTop, behavior: "smooth" });
      setTimeout(() => { isAnimating = false; }, 1400);
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

  // ========== 데이터 ==========
  const pillars = [
    {
      Icon: Users,
      num: "01",
      title: "Multi-User Rhythm Party",
      desc: "여러 유저가 한 방에서 함께 즐기는 K-POP 리듬 캐주얼 플레이",
      tag: "Multi-User",
      bar: "bg-pink-400",
      accent: "text-pink-400",
      ring: "border-pink-500/50",
      dot: "bg-pink-500/30",
      border: "border-pink-500/40",
      bg: "bg-pink-500/[0.02]",
    },
    {
      Icon: Layers,
      num: "02",
      title: "Dance Card Battle",
      desc: "수집한 댄스 카드로 대결하는 카드 기반 무대 시스템",
      tag: "Card Battle",
      bar: "bg-blue-400",
      accent: "text-blue-400",
      ring: "border-blue-400/50",
      dot: "bg-blue-400/30",
      border: "border-blue-400/40",
      bg: "bg-blue-400/[0.02]",
    },
    {
      Icon: Shirt,
      num: "03",
      title: "Avatar & Idol Customization",
      desc: "내 아바타와 보유 아이돌을 모두 꾸미는 강력한 비주얼 BM",
      tag: "Customization",
      bar: "bg-emerald-400",
      accent: "text-emerald-400",
      ring: "border-emerald-400/50",
      dot: "bg-emerald-400/30",
      border: "border-emerald-400/40",
      bg: "bg-emerald-400/[0.02]",
    },
    {
      Icon: Clapperboard,
      num: "04",
      title: "Music Video Creation",
      desc: "수집한 댄스 카드로 나만의 뮤직비디오 제작·공유",
      tag: "MV Studio",
      bar: "bg-amber-400",
      accent: "text-amber-400",
      ring: "border-amber-400/50",
      dot: "bg-amber-400/30",
      border: "border-amber-400/40",
      bg: "bg-amber-400/[0.02]",
    },
    {
      Icon: Building2,
      num: "05",
      title: "Production Management",
      desc: "스케줄·콘서트·팬 수치·사업으로 성장하는 프로덕션 운영",
      tag: "Management",
      bar: "bg-pink-400",
      accent: "text-pink-400",
      ring: "border-pink-500/50",
      dot: "bg-pink-500/30",
      border: "border-pink-500/40",
      bg: "bg-pink-500/[0.02]",
    },
    {
      Icon: Sofa,
      num: "06",
      title: "Social Space & Room",
      desc: "내가 꾸민 방으로 유저를 초대하는 소셜 공간과 로비",
      tag: "Social",
      bar: "bg-teal-400",
      accent: "text-teal-400",
      ring: "border-teal-400/50",
      dot: "bg-teal-400/30",
      border: "border-teal-400/40",
      bg: "bg-teal-400/[0.02]",
    },
  ];

  const gameModes = [
    {
      Icon: Target,
      num: "01",
      en: "Score Battle",
      ko: "개인 스코어 경쟁",
      desc: "같은 곡, 같은 진행 타이밍에서 보유 카드와 판정으로 점수 경쟁",
      bar: "bg-pink-400",
      accent: "text-pink-400",
    },
    {
      Icon: Handshake,
      num: "02",
      en: "Team Battle",
      ko: "팀 단위 실시간 대결",
      desc: "3v3 또는 2v2 팀 합산 점수, 시너지 카드·역할 분담형 플레이",
      bar: "bg-indigo-400",
      accent: "text-indigo-400",
    },
    {
      Icon: Zap,
      num: "03",
      en: "Real-Time Battle",
      ko: "실시간 배틀 모드",
      desc: "데미지형 팀전·압박 카드·역전 구간을 가진 숙련 콘텐츠",
      bar: "bg-amber-400",
      accent: "text-amber-400",
    },
    {
      Icon: Flame,
      num: "04",
      en: "Battle Party",
      ko: "협동 레이드",
      desc: "전설의 스타·레전드 아이돌을 상대로 협력하는 시즌 콘텐츠",
      bar: "bg-teal-400",
      accent: "text-teal-400",
    },
  ];

  const categories = [
    { Icon: Mic2, num: "01", ko: "보컬", en: "Vocal", bar: "bg-pink-400" },
    { Icon: Flame, num: "02", ko: "댄스", en: "Dance", bar: "bg-indigo-400" },
    { Icon: Star, num: "03", ko: "비주얼", en: "Visual", bar: "bg-amber-400" },
    { Icon: Crown, num: "04", ko: "카리스마", en: "Charisma", bar: "bg-teal-400" },
    { Icon: Palette, num: "05", ko: "패션 · 열정", en: "Fashion · Passion", bar: "bg-pink-400" },
  ];

  const careerStages = [
    { label: "신인", en: "ROOKIE" },
    { label: "라이징", en: "RISING" },
    { label: "톱스타", en: "TOP STAR" },
    { label: "슈퍼스타", en: "SUPERSTAR" },
    { label: "명예의 전당", en: "HALL OF FAME" },
  ];

  const tracks = [
    { id: 1, title: "Spotlight", artist: "AURORA", duration: "3:21" },
    { id: 2, title: "Neon Heart", artist: "VELVET CROWN", duration: "2:58" },
    { id: 3, title: "Stage Light", artist: "LUMINA", duration: "3:12" },
    { id: 4, title: "Encore", artist: "SOLAR FLARE", duration: "3:44" },
    { id: 5, title: "Fanfare", artist: "STARDUST", duration: "3:05" },
  ];

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

      {/* ================= ABOUT ================= */}
      <section id="about" className="snap-section relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden noise-bg">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-pink-400/50" />
              <span className="section-label text-pink-400">01 / About</span>
              <div className="h-px w-10 bg-pink-400/50" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
              단순한 리듬 게임이<br />
              <span className="gradient-text-pink">아닙니다</span>
            </h2>
            <p className="text-white/60 text-lg md:text-2xl font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
              <span className="text-pink-300">Play</span> the Music. <span className="text-purple-300">Collect</span> the Dance. <span className="text-amber-300">Build</span> the Idol Agency.
            </p>
          </motion.div>

          {/* 3축 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                Icon: Music2,
                num: "01",
                en: "PLAY",
                title: "Play the Music",
                desc: "K-POP 비트 위에서 카드를 발동하는 신개념 리듬 배틀. 함께 모인 유저와 호흡을 맞추는 라이브 무대.",
                accent: "text-pink-400",
                ring: "border-pink-500/40",
                bar: "bg-pink-400",
              },
              {
                Icon: Layers,
                num: "02",
                en: "COLLECT",
                title: "Collect the Dance",
                desc: "수집한 댄스 카드로 나만의 무대 덱을 구성하고, 곡과 모드에 맞춰 전략적으로 발동하세요.",
                accent: "text-purple-400",
                ring: "border-purple-500/40",
                bar: "bg-purple-400",
              },
              {
                Icon: Crown,
                num: "03",
                en: "BUILD",
                title: "Build the Idol Agency",
                desc: "아이돌 · 의상 · 사옥 · 팬덤까지— 라이브 서비스로 성장하는 나만의 프로덕션을 운영하세요.",
                accent: "text-amber-400",
                ring: "border-amber-500/40",
                bar: "bg-amber-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 md:p-10 bg-white/[0.02] border border-white/10 hover:border-white/30 transition duration-500"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${item.bar}`} />
                <div className="flex items-center justify-between mb-8">
                  <span className={`font-mono-tight text-xs tracking-[0.3em] ${item.accent}`}>
                    {item.num} · {item.en}
                  </span>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${item.ring} ${item.accent} group-hover:shadow-[0_0_25px_currentColor] transition duration-500`}>
                    <item.Icon size={22} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4 group-hover:text-pink-200 transition">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CORE SYSTEM (6 Pillars) ================= */}
      <section id="core" className="snap-section relative min-h-screen py-24 md:py-32 bg-[#0a0a0f]">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/8 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-end mb-14"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">02 / Core System</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                K-POP 프로덕션의 모든 순간,<br />
                <span className="gradient-text-pink">라이브 서비스의 6가지 코어</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              Multi-User Rhythm Party · Dance Card Battle · Avatar/Idol · Music Video · Production · Social Space —
              여섯 개의 코어 시스템이 하나의 K-POP 프로덕션 라이브 서비스로 묶여 있습니다.
            </p>
          </motion.div>

          {/* 6 Pillars 그리드 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {pillars.map((p, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-white/30 transition duration-500"
              >
                {/* 컬러 상단 라인 */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${p.bar}`} />

                {/* 콘텐츠 */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`font-mono-tight text-xs tracking-[0.3em] ${p.accent}`}>
                        {p.num} · CORE PILLAR
                      </span>
                      <h3 className="text-white text-lg font-bold mt-2 leading-tight group-hover:text-pink-200 transition">
                        {p.title}
                      </h3>
                    </div>
                    <div className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl border ${p.ring} ${p.accent} group-hover:shadow-[0_0_20px_currentColor] transition duration-500`}>
                      <p.Icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed mb-5 min-h-[40px]">
                    {p.desc}
                  </p>

                  {/* 점선 박스 placeholder — HUD 스타일 */}
                  <div className={`relative aspect-[4/3] border border-dashed ${p.border} ${p.bg} flex flex-col items-center justify-center overflow-hidden`}>
                    {/* 배경 그리드 */}
                    <div className="absolute inset-0 grid-pattern opacity-40" />

                    {/* 코너 마커 (HUD 느낌) */}
                    <div className={`absolute top-1.5 left-1.5 w-3 h-3 border-l border-t ${p.border} opacity-80`} />
                    <div className={`absolute top-1.5 right-1.5 w-3 h-3 border-r border-t ${p.border} opacity-80`} />
                    <div className={`absolute bottom-1.5 left-1.5 w-3 h-3 border-l border-b ${p.border} opacity-80`} />
                    <div className={`absolute bottom-1.5 right-1.5 w-3 h-3 border-r border-b ${p.border} opacity-80`} />

                    {/* 호버 시 스캔라인 */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                      <div className={`absolute inset-x-0 h-[40%] scan-line bg-gradient-to-b from-transparent via-white/[0.05] to-transparent`} />
                    </div>

                    {/* 메인 시각 요소 */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative w-14 h-14 mb-5">
                        <div className={`absolute inset-0 rounded-full ${p.dot} blur-2xl glow-pulse`} />
                        <div className={`relative w-full h-full rounded-full border ${p.ring} flex items-center justify-center backdrop-blur-sm bg-black/20`}>
                          <p.Icon size={22} strokeWidth={1.5} className={p.accent} />
                        </div>
                      </div>

                      <p className={`font-mono-tight text-[9px] tracking-[0.3em] ${p.accent} mb-2`}>
                        PREVIEW · {p.num}
                      </p>
                      <p className="text-white/60 text-[11px] font-bold px-4 text-center leading-relaxed">
                        {p.title}
                      </p>
                    </div>
                  </div>

                  {/* 하단 태그 */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-mono-tight text-[10px] text-white/30 tracking-[0.2em] uppercase">
                      {p.tag}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= PHONE VIDEO MORPHING (데스크톱 시각 효과) ================= */}
      <section className="snap-section hidden md:block relative bg-[#0a0a0f]">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

        {/* 데스크톱 전용: 풀스크린 → 단계적 축소 → 가로 폰 모핑 */}
        <div ref={phoneSectionRef} className="relative w-full" style={{ height: "180vh", width: "100vw" }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* 폰 프레임 래퍼 — 고정 크기 + scale 애니메이션 (Apple 스타일) */}
              <motion.div
                style={{ scale: phoneScale, width: "850px", height: "420px", borderRadius: "48px" }}
                className="relative will-change-transform shrink-0"
              >
                {/* 화면 영역 (overflow-hidden은 여기만) */}
                <motion.div
                  style={{
                    borderWidth: phoneBorderW,
                    borderStyle: "solid",
                    borderColor: "#7a8ba8",
                    borderRadius: "48px",
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

      </section>

      {/* ================= GAME MODES ================= */}
      <section id="modes" className="snap-section relative min-h-screen flex items-center py-24 md:py-32 bg-[#0a0a0f]">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-pink-500/8 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          {/* 섹션 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-end mb-14"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">03 / Game Modes</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                혼자도, 친구와도,<br />
                <span className="gradient-text-gold">협동 레이드까지</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              스코어전 · 팀전 · 실시간 배틀 · 배틀파티 — 캐주얼부터 협동 레이드까지,
              혼자 즐겨도 친구와 모여도 어울리는 4개의 모드.
            </p>
          </motion.div>

          {/* 모바일 전용 간단 비디오 */}
          <div className="md:hidden relative aspect-video w-full overflow-hidden border border-white/10 mb-12">
            <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
              <source src="/dance.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Game Modes 4개 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {gameModes.map((m, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition duration-500 p-7"
              >
                {/* 호버 시 상단 라인 글로우 */}
                <div className={`absolute inset-x-6 -top-1 h-2 ${m.bar} blur-md opacity-0 group-hover:opacity-100 transition duration-500`} />
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${m.bar}`} />

                <div className="flex items-center justify-between mb-7">
                  <span className={`font-mono-tight text-xs tracking-[0.3em] ${m.accent}`}>
                    {m.num}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className={`mb-5 ${m.accent} group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_currentColor] transition duration-500`}>
                    <m.Icon size={44} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {m.en}
                  </h3>
                  <p className={`text-sm font-bold ${m.accent}`}>
                    {m.ko}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/5">
                  <p className="text-sm text-white/50 leading-relaxed text-center">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* 협동 강조 배너 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 p-6 md:p-7 border border-pink-500/30 bg-pink-500/5 text-center"
          >
            <p className="text-pink-300 text-sm md:text-base font-bold tracking-wide">
              협동 플레이가 커뮤니티를 강화하고, 시즌 이벤트 · 한정 보상 · 스트리머 콘텐츠로 확장 가능합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= IDOL MANAGEMENT (육성) ================= */}
      <section id="management" className="snap-section relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-pink-500/8 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-end mb-14"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">04 / Idol Management</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                5대 카테고리,<br />
                50개의 세부 스탯으로<br />
                <span className="gradient-text-pink">깊은 육성</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              단순 공·방 구조가 아닌, 아이돌의 활동 영역을 결정하는 성장 지표.
              스탯 · 커리어 · 성격 · 재능까지 — 아이돌마다 다른 길을 만드는 시스템.
            </p>
          </motion.div>

          {/* 50 카드 + 5 카테고리 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-[0.9fr_1.4fr] gap-5"
          >
            {/* 50 SUB-STATS 카드 */}
            <div className="relative bg-white/[0.02] border border-white/10 p-10 md:p-12 flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-pink-400" />
              <div ref={counterRef} className="font-display gradient-text-pink leading-none text-[8rem] md:text-[10rem] tabular-nums">
                {statCount}
              </div>
              <div className="mt-3 mb-2 flex items-center gap-3">
                <div className="h-px w-8 bg-pink-400/40" />
                <span className="font-mono-tight text-xs tracking-[0.3em] text-white/70">
                  SUB-STATS PER IDOL
                </span>
                <div className="h-px w-8 bg-pink-400/40" />
              </div>
              <p className="text-white/50 text-sm mt-6 leading-relaxed">
                스케줄 · 콘서트 · 사업<br />
                슈퍼스타 · 팀 편성에 모두 반영
              </p>
            </div>

            {/* 5 CATEGORIES 리스트 */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono-tight text-xs tracking-[0.3em] text-white/50">
                  5 CATEGORIES
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="flex flex-col gap-3">
                {categories.map((c, i) => (
                  <div
                    key={i}
                    className="group relative bg-white/[0.02] border border-white/10 hover:border-white/30 transition duration-500 flex items-center"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.bar}`} />
                    <div className="grid grid-cols-[60px_50px_1fr_auto] items-center gap-4 w-full pl-6 pr-6 py-4">
                      <span className="font-mono-tight text-xs tracking-[0.3em] text-white/50">
                        {c.num}
                      </span>
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white/80 group-hover:text-white transition">
                        <c.Icon size={22} strokeWidth={1.5} />
                      </div>
                      <span className="text-white text-base md:text-lg font-bold">
                        {c.ko}
                      </span>
                      <span className="font-mono-tight text-xs italic text-white/40">
                        {c.en}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 커리어 라이프사이클 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 bg-white/[0.02] border border-white/10 p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={18} className="text-amber-400" />
              <span className="font-mono-tight text-xs tracking-[0.3em] text-amber-400">
                CAREER LIFECYCLE
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold mb-8">
              신인부터 명예의 전당까지, <span className="text-amber-300">단계별 커리어</span>
            </h3>

            <div className="relative">
              <div className="absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-pink-500/50 via-amber-400/50 to-pink-500/50" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
                {careerStages.map((stage, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-6 h-6 rounded-full bg-[#0a0a0f] border-2 border-amber-400 flex items-center justify-center mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <span className="text-white text-base md:text-lg font-bold mb-1">
                      {stage.label}
                    </span>
                    <span className="font-mono-tight text-[10px] text-white/40 tracking-[0.2em]">
                      {stage.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 성격·재능 칩 */}
            <div className="mt-10 pt-8 border-t border-white/10 grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-pink-400" />
                  <span className="font-mono-tight text-[10px] tracking-[0.3em] text-pink-400">
                    PERSONALITY
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  성격이 활동 선택 · 팬 호감도 · 팀 시너지에 영향을 줍니다. 카리스마형, 청순형, 4차원, 노력파…
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star size={14} className="text-amber-400" />
                  <span className="font-mono-tight text-[10px] tracking-[0.3em] text-amber-400">
                    TALENT
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  재능 시스템은 같은 등급의 아이돌도 서로 다른 강점을 갖게 만듭니다. 뽑은 그날부터 운명이 갈립니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SOUNDTRACK PREVIEW ================= */}
      <section id="soundtrack" className="snap-section relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/8 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-end mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">05 / Soundtrack</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                음악이 먼저,<br />
                <span className="gradient-text-pink">그 다음이 게임</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              K-POP 리듬 게임의 핵심 후킹은 음악입니다. 30초 미리듣기로
              Dear Idol의 사운드트랙을 먼저 들어보세요.
            </p>
          </motion.div>

          {/* 곡 리스트 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/[0.02] border border-white/10"
          >
            <div className="grid grid-cols-[60px_60px_1fr_auto_auto] md:grid-cols-[80px_60px_1fr_1fr_auto_auto] items-center gap-4 px-6 py-4 border-b border-white/10">
              <span className="font-mono-tight text-[10px] tracking-[0.3em] text-white/40">PLAY</span>
              <span className="font-mono-tight text-[10px] tracking-[0.3em] text-white/40">#</span>
              <span className="font-mono-tight text-[10px] tracking-[0.3em] text-white/40">TITLE</span>
              <span className="hidden md:inline font-mono-tight text-[10px] tracking-[0.3em] text-white/40">ARTIST</span>
              <span className="font-mono-tight text-[10px] tracking-[0.3em] text-white/40 text-right">PREVIEW</span>
              <span className="font-mono-tight text-[10px] tracking-[0.3em] text-white/40 text-right">LENGTH</span>
            </div>

            {tracks.map((t) => {
              const isPlaying = playingTrack === t.id;
              return (
                <div
                  key={t.id}
                  className={`group grid grid-cols-[60px_60px_1fr_auto_auto] md:grid-cols-[80px_60px_1fr_1fr_auto_auto] items-center gap-4 px-6 py-4 border-b border-white/5 transition cursor-pointer ${
                    isPlaying ? "bg-pink-500/10" : "hover:bg-white/[0.03]"
                  }`}
                  onClick={() => setPlayingTrack(isPlaying ? null : t.id)}
                >
                  <button
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center transition ${
                      isPlaying
                        ? "bg-pink-400 text-black"
                        : "bg-white/[0.06] text-white/70 group-hover:bg-white group-hover:text-black"
                    }`}
                  >
                    {isPlaying ? (
                      <div className="flex items-end justify-center gap-[2px] h-3.5 w-4">
                        {[0, 1, 2, 3, 4].map((b) => (
                          <span key={b} className="eq-bar w-[2px] h-full bg-current rounded-sm" />
                        ))}
                      </div>
                    ) : (
                      <Play size={14} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>
                  <span className={`font-mono-tight text-sm ${isPlaying ? "text-pink-400" : "text-white/40"}`}>
                    {String(t.id).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-base md:text-lg font-bold truncate ${isPlaying ? "text-pink-200" : "text-white"}`}>
                        {t.title}
                      </p>
                      {isPlaying && (
                        <span className="hidden md:inline font-mono-tight text-[9px] tracking-[0.3em] text-pink-400 border border-pink-400/40 px-1.5 py-0.5">
                          NOW PLAYING
                        </span>
                      )}
                    </div>
                    <p className="md:hidden text-xs text-white/40 truncate font-mono-tight tracking-wider">
                      {t.artist}
                    </p>
                  </div>
                  <span className="hidden md:inline font-mono-tight text-sm text-white/50 tracking-wider truncate">
                    {t.artist}
                  </span>
                  <span className="font-mono-tight text-[10px] text-white/40 tracking-[0.2em]">
                    0:30
                  </span>
                  <span className="font-mono-tight text-sm text-white/50 tabular-nums">
                    {t.duration}
                  </span>
                </div>
              );
            })}

            {/* 푸터 */}
            <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Headphones size={14} />
                <span className="font-mono-tight tracking-wider">30-SECOND PREVIEWS</span>
              </div>
              <span className="text-xs text-white/30">
                전곡은 정식 출시 후 게임에서 만나보세요.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= NEWS ================= */}
      <section id="news" className="snap-section relative min-h-screen pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden noise-bg">
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
                <span className="section-label text-pink-400">06 / News</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
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

      {/* ================= CTA / 사전예약 ================= */}
      <section id="cta" className="snap-section relative min-h-screen flex items-center py-24 md:py-32 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden rounded-2xl"
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
