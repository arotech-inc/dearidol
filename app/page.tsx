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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Users,
  Layers,
  Sofa,
  Zap,
  Flame,
  Mic2,
  Star,
  Crown,
  Palette,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";

const barColor: Record<string, string> = {
  "bg-pink-400": "#f472b6",
  "bg-pink-500": "#ec4899",
  "bg-blue-400": "#60a5fa",
  "bg-emerald-400": "#34d399",
  "bg-amber-400": "#fbbf24",
  "bg-teal-400": "#2dd4bf",
  "bg-purple-400": "#c084fc",
  "bg-indigo-400": "#818cf8",
  "bg-cyan-400": "#22d3ee",
  "bg-rose-400": "#fb7185",
};

export default function Home() {
  const router = useRouter();
  const [activeNews, setActiveNews] = useState(0);
  const [activePillar, setActivePillar] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // 50 카운트업 (Idol Management 섹션)
  const counterRef = useRef<HTMLDivElement>(null);
  const counterInView = useInView(counterRef, { amount: 0.5 });
  const [statCount, setStatCount] = useState(1);
  useEffect(() => {
    if (!counterInView) return;
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
    // 모바일·좁은 데스크톱(lg 미만)에서는 자유 스크롤 허용
    if (window.matchMedia("(max-width: 1023px)").matches) return;

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
      desc: "여러 유저가 한 방에서 함께 즐기는 캐주얼 리듬 플레이",
      tag: "Multi-User",
      bar: "bg-pink-400",
      accent: "text-pink-400",
      ring: "border-pink-500/50",
      dot: "bg-pink-500/30",
      border: "border-pink-500/40",
      bg: "bg-pink-500/[0.02]",
      image: "/multi-user.webp",
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
      image: "/dance-card.webp",
    },
    {
      Icon: Shirt,
      num: "03",
      title: "Avatar & Idol Customization",
      desc: "내 아바타와 아이돌을 자유롭게 꾸미는 강력한 커스터마이징",
      tag: "Customization",
      bar: "bg-emerald-400",
      accent: "text-emerald-400",
      ring: "border-emerald-400/50",
      dot: "bg-emerald-400/30",
      border: "border-emerald-400/40",
      bg: "bg-emerald-400/[0.02]",
      image: "/idol-customization.webp",
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
      image: "/music-video.webp",
    },
    {
      Icon: Building2,
      num: "05",
      title: "Production Management",
      desc: "스케줄·콘서트·팬 수치·사업으로 성장하는 프로덕션 운영",
      tag: "Management",
      bar: "bg-purple-400",
      accent: "text-purple-400",
      ring: "border-purple-500/50",
      dot: "bg-purple-500/30",
      border: "border-purple-500/40",
      bg: "bg-purple-500/[0.02]",
      image: "/schedule.webp",
    },
    {
      Icon: Sofa,
      num: "06",
      title: "Social Space & Room",
      desc: "내가 꾸민 방으로 유저를 초대하는 소셜 공간과 로비",
      tag: "Social",
      bar: "bg-cyan-400",
      accent: "text-cyan-400",
      ring: "border-cyan-400/50",
      dot: "bg-cyan-400/30",
      border: "border-cyan-400/40",
      bg: "bg-cyan-400/[0.02]",
      image: "/design.webp",
    },
  ];

  const categories = [
    { Icon: Mic2, num: "01", ko: "보컬", en: "Vocal", bar: "bg-pink-400" },
    { Icon: Flame, num: "02", ko: "댄스", en: "Dance", bar: "bg-indigo-400" },
    { Icon: Star, num: "03", ko: "비주얼", en: "Visual", bar: "bg-amber-400" },
    { Icon: Crown, num: "04", ko: "카리스마", en: "Charisma", bar: "bg-teal-400" },
    { Icon: Palette, num: "05", ko: "패션 · 열정", en: "Fashion · Passion", bar: "bg-rose-400" },
  ];

  const loopStages = [
    { Icon: Zap, label: "Battle", desc: "리듬 배틀", accent: "text-pink-400", border: "border-pink-500/30", bar: "bg-pink-400" },
    { Icon: Sparkles, label: "Earn", desc: "보상 획득", accent: "text-purple-400", border: "border-purple-500/30", bar: "bg-purple-400" },
    { Icon: Flame, label: "Train", desc: "아이돌 육성", accent: "text-blue-400", border: "border-blue-400/30", bar: "bg-blue-400" },
    { Icon: Mic2, label: "Perform", desc: "무대 공연", accent: "text-amber-400", border: "border-amber-400/30", bar: "bg-amber-400" },
    { Icon: Star, label: "Grow", desc: "성장 · 명성", accent: "text-emerald-400", border: "border-emerald-400/30", bar: "bg-emerald-400" },
    { Icon: Trophy, label: "Unlock", desc: "콘텐츠 해금", accent: "text-cyan-400", border: "border-cyan-400/30", bar: "bg-cyan-400" },
  ];

  const careerStages = [
    { label: "신인", en: "ROOKIE" },
    { label: "라이징", en: "RISING" },
    { label: "톱스타", en: "TOP STAR" },
    { label: "슈퍼스타", en: "SUPERSTAR" },
    { label: "명예의 전당", en: "HALL OF FAME" },
  ];

  const growthStages = [
    { num: "01", ko: "작은 사무실", en: "Startup Studio", desc: "신인 프로듀서의 첫 무대", accent: "text-pink-400", border: "border-pink-500/40", bar: "bg-pink-400" },
    { num: "02", ko: "중소 기획사", en: "Growing Agency", desc: "팬덤 확장과 첫 히트곡", accent: "text-purple-400", border: "border-purple-500/40", bar: "bg-purple-400" },
    { num: "03", ko: "메이저 레이블", en: "Major Label", desc: "전국 단위 매니지먼트", accent: "text-amber-400", border: "border-amber-500/40", bar: "bg-amber-400" },
    { num: "04", ko: "글로벌 사옥", en: "Global HQ", desc: "월드 투어와 국제 진출", accent: "text-cyan-400", border: "border-cyan-400/40", bar: "bg-cyan-400" },
  ];

  return (
    <main className="bg-[#0a0a0f] text-white">

      {/* ================= HERO ================= */}
      <section className="snap-section relative h-screen min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">

        {/* 데스크톱: 가로형 영상 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-top"
        >
          <source src="/dearidol-hero.mp4" type="video/mp4" />
        </video>

        {/* 모바일: 세로형 영상 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-top"
        >
          <source src="/dearidol-hero-m.mp4" type="video/mp4" />
        </video>

        {/* 비네팅 + 하단 페이드 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          className="relative z-10 px-5 md:px-8 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-20 md:pt-28"
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
            className="font-display text-[clamp(2.75rem,11vw,9rem)] leading-[0.85] mb-4 px-4"
          >
            <span className="block text-white">PRODUCE</span>
            <span className="block gradient-text-pink">YOUR STAR</span>
          </motion.h1>

          {/* 서브 카피 */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-white/70 text-base md:text-xl font-medium tracking-wide mt-8 mb-14 px-4"
          >
            가장 화려한 피날레, 당신의 손끝에서 완성되다.
          </motion.p>

          {/* 스토어 뱃지 + 트레일러 아이콘 */}
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
              {/* App Store 버튼 */}
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-[180px] md:w-[200px] h-12 md:h-14 relative transition hover:opacity-80 hover:-translate-y-0.5 duration-300"
              >
                <Image src="/appstore.svg" alt="App Store" fill className="object-contain" />
              </a>

              {/* Google Play 버튼 */}
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-[180px] md:w-[200px] h-12 md:h-14 relative transition hover:opacity-80 hover:-translate-y-0.5 duration-300"
              >
                <Image src="/googleplay.png" alt="Google Play" fill className="object-contain" />
              </a>

              {/* 트레일러 아이콘 버튼 */}
              <a
                href="#scenes"
                aria-label="트레일러 보기"
                title="트레일러 보기"
                className="group ml-1 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition text-white/80 shrink-0"
              >
                <Play size={14} fill="currentColor" className="ml-0.5" />
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
      <section id="about" className="snap-section relative min-h-screen pt-36 md:pt-48 pb-24 md:pb-32 overflow-hidden noise-bg">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-10 bg-pink-400/50" />
              <span className="section-label text-pink-400">01 / About</span>
              <div className="h-px w-10 bg-pink-400/50" />
            </div>

            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-10">
              단순한 리듬 게임이<br />
              <span className="gradient-text-pink">아닙니다</span>
            </h2>

            <p className="text-white/80 text-lg md:text-2xl font-bold tracking-wide max-w-3xl mx-auto leading-relaxed mb-6">
              <span className="text-pink-400">Play</span> the Music.{" "}
              <span className="text-purple-400">Collect</span> the Dance.{" "}
              <span className="text-amber-400">Build</span> the Idol Agency.
            </p>

            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              무대를 플레이하고, 보상을 모아, 당신만의 아이돌 세계를 완성하세요.
            </p>
          </motion.div>

          {/* 코어 루프 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mt-20 md:mt-24"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {loopStages.map((s, i) => (
                <div key={i} className="relative">
                  <div className="group relative bg-white/[0.02] border border-white/10 hover:border-white/30 transition duration-500 p-4 md:p-5 text-center overflow-hidden">
                    {/* 상단 컬러 라인 */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 ${s.bar}`} />

                    <div className={`mb-2.5 inline-flex items-center justify-center w-10 h-10 rounded-full border ${s.border} ${s.accent} group-hover:shadow-[0_0_18px_currentColor] transition duration-500`}>
                      <s.Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="text-white font-bold text-base md:text-lg">{s.label}</div>
                    <div className="text-white/40 text-xs mt-0.5">{s.desc}</div>
                  </div>
                  {/* 화살표 (lg에서만) */}
                  {i < loopStages.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10 text-white/30">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CORE SYSTEM (6 Pillars) ================= */}
      <section id="core" className="snap-section relative min-h-screen py-24 md:py-32 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/8 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-center mb-14"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">02 / Core System</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display leading-[1.1] md:whitespace-nowrap text-[clamp(2.25rem,5vw,3.75rem)]">
                프로덕션의 모든 순간,<br />
                <span className="gradient-text-pink">디어아이돌의 핵심 코어</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              여섯 개의 코어 시스템으로 폭 넓은 라이브 서비스를 경험
            </p>
          </motion.div>

          {/* 6 Pillars 탭 + 슬라이드 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* 탭 — 6개 번호 + 라벨 (모바일은 짧게, 데스크톱은 풀 라벨) */}
            <div className="relative mb-6 md:mb-8">
              <div className="flex gap-1 overflow-x-auto scrollbar-none pb-2 border-b border-white/10">
                {pillars.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePillar(i)}
                    className={`relative shrink-0 px-3 md:px-6 py-2.5 md:py-3 text-left transition group ${
                      activePillar === i ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 md:gap-2 mb-0 md:mb-0.5">
                      <span className={`font-mono-tight text-[10px] tracking-[0.2em] ${activePillar === i ? p.accent : ""}`}>
                        {p.num}
                      </span>
                      <p.Icon size={12} strokeWidth={1.8} className={activePillar === i ? p.accent : "text-white/30"} />
                    </div>
                    {/* 모바일: 라벨 짧게 / 데스크톱: 풀 */}
                    <span className="hidden md:block text-sm font-bold whitespace-nowrap">{p.tag}</span>
                    {/* 활성 인디케이터 */}
                    {activePillar === i && (
                      <motion.div
                        layoutId="pillarTabIndicator"
                        className={`absolute -bottom-[1px] left-0 right-0 h-[2px] ${p.bar}`}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 슬라이드 콘텐츠 (모바일 스와이프 지원) */}
            <motion.div
              className="relative touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const threshold = 60;
                if (info.offset.x < -threshold) {
                  setActivePillar((p) => (p + 1) % pillars.length);
                } else if (info.offset.x > threshold) {
                  setActivePillar((p) => (p - 1 + pillars.length) % pillars.length);
                }
              }}
            >
              {/* 좌우 화살표 (데스크톱만, 슬라이드 양옆 플로팅) */}
              <button
                onClick={() => setActivePillar((p) => (p - 1 + pillars.length) % pillars.length)}
                aria-label="이전"
                className="hidden md:flex absolute left-0 lg:-left-4 xl:-left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/15 hover:border-white/50 hover:bg-black/70 items-center justify-center text-white/70 hover:text-white transition group"
              >
                <ChevronLeft size={20} className="transition group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={() => setActivePillar((p) => (p + 1) % pillars.length)}
                aria-label="다음"
                className="hidden md:flex absolute right-0 lg:-right-4 xl:-right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/15 hover:border-white/50 hover:bg-black/70 items-center justify-center text-white/70 hover:text-white transition group"
              >
                <ChevronRight size={20} className="transition group-hover:translate-x-0.5" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center md:min-h-[420px]">
                {/* 이미지 — 모바일 위 / 데스크톱 좌측 */}
                <div className="relative order-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`img-${activePillar}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`relative aspect-[4/3] border ${pillars[activePillar].border} overflow-hidden ${pillars[activePillar].image ? "" : pillars[activePillar].bg}`}
                    >
                      {pillars[activePillar].image ? (
                        <Image
                          src={pillars[activePillar].image}
                          alt={pillars[activePillar].title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain pointer-events-none select-none"
                          draggable={false}
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid-pattern absolute inset-0 opacity-40" />
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="relative w-20 h-20 mb-5">
                              <div className={`absolute inset-0 rounded-full ${pillars[activePillar].dot} blur-2xl glow-pulse`} />
                              <div className={`relative w-full h-full rounded-full border ${pillars[activePillar].ring} flex items-center justify-center backdrop-blur-sm bg-black/20`}>
                                {(() => {
                                  const Icon = pillars[activePillar].Icon;
                                  return <Icon size={28} strokeWidth={1.5} className={pillars[activePillar].accent} />;
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 코너 마커 */}
                      <div className={`absolute top-1.5 left-1.5 w-3 h-3 border-l border-t ${pillars[activePillar].border} opacity-80 z-10`} />
                      <div className={`absolute top-1.5 right-1.5 w-3 h-3 border-r border-t ${pillars[activePillar].border} opacity-80 z-10`} />
                      <div className={`absolute bottom-1.5 left-1.5 w-3 h-3 border-l border-b ${pillars[activePillar].border} opacity-80 z-10`} />
                      <div className={`absolute bottom-1.5 right-1.5 w-3 h-3 border-r border-b ${pillars[activePillar].border} opacity-80 z-10`} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 설명 — 모바일 아래 / 데스크톱 우측 */}
                <div className="relative order-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`txt-${activePillar}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <span className={`font-mono-tight text-[10px] md:text-xs tracking-[0.3em] ${pillars[activePillar].accent}`}>
                          {pillars[activePillar].num} · CORE PILLAR
                        </span>
                        <div className={`h-px flex-1 ${pillars[activePillar].border.replace("border-", "bg-").replace("/40", "/30")}`} />
                      </div>

                      <h3 className="font-display text-2xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-5">
                        {pillars[activePillar].title}
                      </h3>

                      <p className="text-sm md:text-lg text-white/60 leading-relaxed mb-6 md:mb-8 max-w-md">
                        {pillars[activePillar].desc}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl border ${pillars[activePillar].ring} ${pillars[activePillar].accent}`}>
                          {(() => {
                            const Icon = pillars[activePillar].Icon;
                            return <Icon size={16} strokeWidth={1.5} />;
                          })()}
                        </span>
                        <span className={`font-mono-tight text-[10px] md:text-xs tracking-[0.3em] ${pillars[activePillar].accent}`}>
                          {pillars[activePillar].tag.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 모바일: 스와이프 힌트 + 도트 인디케이터 */}
              <div className="md:hidden flex flex-col items-center gap-3 mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  {pillars.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePillar(i)}
                      aria-label={`${i + 1}번 슬라이드로 이동`}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === activePillar
                          ? `w-6 ${pillars[activePillar].bar}`
                          : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-mono-tight text-[10px] tracking-[0.3em] text-white/30">
                  ← SWIPE · {String(activePillar + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")} →
                </p>
              </div>

              {/* 데스크톱: 페이지 표시만 중앙 */}
              <div className="hidden md:flex items-center justify-center mt-8 pt-6 border-t border-white/10">
                <div className="font-mono-tight text-xs tracking-[0.3em] text-white/40">
                  {String(activePillar + 1).padStart(2, "0")}
                  <span className="mx-2 text-white/20">/</span>
                  <span className="text-white/30">{String(pillars.length).padStart(2, "0")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= PHONE VIDEO MORPHING (데스크톱 시각 효과 — lg 이상) ================= */}
      <section className="snap-section hidden lg:block relative bg-[#0a0a0f]">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

        {/* 데스크톱 전용: 풀스크린 → 단계적 축소 → 가로 폰 모핑 */}
        <div ref={phoneSectionRef} className="relative w-full" style={{ height: "180vh" }}>
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
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/dear.mp4" type="video/mp4" />
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

            {/* 음소거 해제 버튼 */}
            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              aria-label={isMuted ? "사운드 켜기" : "사운드 끄기"}
              className="absolute bottom-8 right-8 md:bottom-10 md:right-10 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-pink-400/60 hover:bg-pink-500/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>

      </section>

      {/* ================= IDOL MANAGEMENT (육성) ================= */}
      <section id="management" className="snap-section relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-pink-500/8 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-center mb-14"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">03 / Idol Management</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                5대 카테고리,<br />
                50개의 세부 스탯으로<br />
                <span className="gradient-text-pink">깊은 육성</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              아이돌의 활동 영역을 결정하는 성장 지표.<br />
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
                {categories.map((c, i) => {
                  const color = barColor[c.bar] ?? "#f472b6";
                  return (
                    <div
                      key={i}
                      className="group relative bg-white/[0.02] border border-white/10 hover:border-white/30 transition duration-500 flex items-center"
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.bar}`} />
                      <div className="grid grid-cols-[40px_44px_1fr] md:grid-cols-[60px_50px_1fr_auto] items-center gap-3 md:gap-4 w-full pl-4 pr-4 md:pl-6 md:pr-6 py-4">
                        <span className="font-mono-tight text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] text-white/50">
                          {c.num}
                        </span>
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg border transition duration-500 group-hover:shadow-[0_0_18px_currentColor]"
                          style={{ color, borderColor: `${color}66` }}
                        >
                          <c.Icon size={22} strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0 flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
                          <span className="text-white text-base md:text-lg font-bold whitespace-nowrap">
                            {c.ko}
                          </span>
                          <span className="font-mono-tight text-[10px] md:text-xs italic text-white/40 whitespace-nowrap">
                            {c.en}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
              {/* 데스크탑: 가로 라인 */}
              <div className="hidden md:block absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-pink-500/50 via-amber-400/50 to-pink-500/50" />
              {/* 모바일: 세로 라인 */}
              <div className="md:hidden absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-pink-500/50 via-amber-400/50 to-pink-500/50" />
              <div className="flex flex-col gap-5 md:grid md:grid-cols-5 md:gap-6 relative">
                {careerStages.map((stage, i) => (
                  <div key={i} className="flex md:flex-col items-center md:text-center gap-4 md:gap-0">
                    <div className="relative z-10 shrink-0 w-6 h-6 rounded-full bg-[#0a0a0f] border-2 border-amber-400 flex items-center justify-center md:mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-base md:text-lg font-bold md:mb-1">
                        {stage.label}
                      </span>
                      <span className="font-mono-tight text-[10px] text-white/40 tracking-[0.2em]">
                        {stage.en}
                      </span>
                    </div>
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
                  아이돌의 성격이 활동 선택 · 팬 호감도 · 팀 시너지에 영향을 줍니다.
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
                  재능 시스템은 같은 등급의 아이돌도 서로 다른 강점을 갖게 만듭니다. <br />
                  뽑은 그날부터 운명이 갈립니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= GROWING PRODUCTION ================= */}
      <section id="growth" className="snap-section relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/8 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-center mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">04 / Growing Production</span>
                <div className="h-px w-12 bg-pink-400/30" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                작은 사무실에서<br />
                <span className="gradient-text-pink">글로벌 사옥까지</span>
              </h2>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
              아이돌이 성장할수록 프로덕션도 함께 커집니다.
              데뷔 직후의 작은 스튜디오부터 월드 투어를 지휘하는 글로벌 사옥까지 — 당신의 손으로 키워보세요.
            </p>
          </motion.div>

          {/* 4단계 성장 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {growthStages.map((g, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-white/30 transition duration-500 overflow-hidden"
              >
                {/* 상단 컬러 라인 */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${g.bar} z-10`} />

                {/* 이미지 placeholder */}
                <div className={`relative aspect-[4/5] border-b ${g.border} bg-white/[0.01] flex items-center justify-center overflow-hidden`}>
                  {/* 배경 그리드 */}
                  <div className="absolute inset-0 grid-pattern opacity-30" />

                  {/* 코너 마커 */}
                  <div className={`absolute top-2 left-2 w-3 h-3 border-l border-t ${g.border} opacity-80`} />
                  <div className={`absolute top-2 right-2 w-3 h-3 border-r border-t ${g.border} opacity-80`} />
                  <div className={`absolute bottom-2 left-2 w-3 h-3 border-l border-b ${g.border} opacity-80`} />
                  <div className={`absolute bottom-2 right-2 w-3 h-3 border-r border-b ${g.border} opacity-80`} />

                  {/* 빈칸 라벨 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className={`font-mono-tight text-[10px] tracking-[0.3em] ${g.accent} mb-1`}>STAGE {g.num}</span>
                    <span className="text-white/30 text-[10px] font-mono-tight tracking-wider">IMAGE</span>
                  </div>
                </div>

                {/* 텍스트 */}
                <div className="p-4 md:p-5">
                  <div className={`font-mono-tight text-[10px] tracking-[0.3em] ${g.accent} mb-1.5`}>
                    {g.num} · {g.en}
                  </div>
                  <h3 className="text-white text-base md:text-lg font-bold mb-1.5">{g.ko}</h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= NEWS ================= */}
      <section id="news" className="snap-section relative min-h-screen pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden noise-bg">
        {/* 배경 */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-end justify-between mb-10 gap-8 flex-wrap"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label text-pink-400">05 / News</span>
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
                <p className="font-mono-tight text-white/90 text-xs font-bold tracking-wider mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{newsData[activeNews].date}</p>
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

    </main>
  );
}
