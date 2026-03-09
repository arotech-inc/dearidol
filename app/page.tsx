"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { newsData } from "./data";

export default function Home() {
  const router = useRouter();

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

        <div className="relative z-10 text-center px-6">
          <h2 className="text-6xl md:text-8xl font-extrabold text-pink-400">
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
      <motion.section
        id="updates"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={fadeUp}
        className="py-32 px-6"
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-12">
          <h3 className="text-4xl font-bold text-pink-400">
            Latest Updates
          </h3>
          <button className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition">
            더보기
          </button>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {newsData.map((item, i) => (
            <div
              key={i}
              onClick={() => router.push(`/news/${item.slug}`)}
              className="cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:scale-105 transition duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-sm opacity-60 mb-2">{item.date}</p>
                <h4 className="font-semibold">{item.title}</h4>
              </div>
            </div>
          ))}

        </div>
      </motion.section>

      {/* ================= REWARDS ================= */}
      <section id="rewards" className="py-32 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400 mb-12">
          Pre-registration Rewards
        </h3>

        <div className="space-y-6 opacity-80 text-lg">
          <p>10,000 Registrations – Exclusive Costume</p>
          <p>50,000 Registrations – Premium Currency</p>
          <p>100,000 Registrations – Limited Idol Card</p>
        </div>
      </section>

      {/* ================= TRAILER ================= */}
      <section id="trailer" className="py-32 px-6 text-center border-t border-white/10">
        <h3 className="text-4xl font-bold text-pink-400 mb-12">
          Trailer
        </h3>

        <div className="max-w-4xl mx-auto">
          <video controls className="w-full rounded-xl">
            <source src="/trailer.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

    </main>
  );
}