"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = [
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "문의하기" },
  { id: "account", label: "계정 문제" },
  { id: "payment", label: "결제 문제" },
];

const faqItems = [
  {
    question: "게임은 어디서 다운로드할 수 있나요?",
    answer: "Google Play 스토어 및 Apple App Store에서 'Dear Idol'을 검색하여 다운로드하실 수 있습니다. 정식 출시 전에는 사전예약만 가능합니다.",
  },
  {
    question: "사전예약 보상은 언제 지급되나요?",
    answer: "사전예약 보상은 게임 정식 출시 후 처음 로그인 시 자동으로 우편함을 통해 지급됩니다.",
  },
  {
    question: "지원하는 기기 사양이 어떻게 되나요?",
    answer: "Android 8.0 이상, iOS 13.0 이상을 권장합니다. 원활한 플레이를 위해 RAM 4GB 이상의 기기를 권장드립니다.",
  },
  {
    question: "게임 내 데이터가 사라졌어요.",
    answer: "계정 연동(Google/Apple) 여부를 먼저 확인해 주세요. 연동이 되어 있지 않은 경우 기기 교체 또는 앱 삭제 시 데이터가 복구되지 않을 수 있습니다.",
  },
  {
    question: "서버 점검은 얼마나 자주 진행되나요?",
    answer: "정기 점검은 매주 화요일 새벽 4~6시에 진행됩니다. 긴급 점검의 경우 공식 SNS와 게임 공지를 통해 별도 안내드립니다.",
  },
];

const accountItems = [
  {
    title: "비밀번호 재설정",
    desc: "로그인 화면의 '비밀번호 찾기'를 통해 가입 이메일로 재설정 링크를 받을 수 있습니다.",
    icon: "🔑",
  },
  {
    title: "계정 연동",
    desc: "설정 > 계정 관리에서 Google 또는 Apple 계정과 연동하여 기기를 변경해도 데이터를 유지할 수 있습니다.",
    icon: "🔗",
  },
  {
    title: "계정 정지/제한",
    desc: "이용약관 위반으로 인한 제재의 경우 제재 사유가 이메일로 전송됩니다. 이의 신청은 문의하기를 통해 접수 가능합니다.",
    icon: "🚫",
  },
  {
    title: "계정 탈퇴",
    desc: "설정 > 계정 관리 > 탈퇴 신청을 통해 진행할 수 있습니다. 탈퇴 후 30일간 재가입이 제한됩니다.",
    icon: "⚠️",
  },
];

const paymentItems = [
  {
    title: "결제 내역 확인",
    desc: "구글 플레이 / 앱스토어의 구매 내역에서 확인 가능합니다. 게임 내 구매 내역은 설정 > 결제 내역에서도 확인할 수 있습니다.",
    icon: "🧾",
  },
  {
    title: "결제 오류",
    desc: "결제가 완료되었으나 아이템이 지급되지 않은 경우, 결제 영수증을 첨부하여 문의하기로 접수해 주세요. 영업일 기준 3일 이내 처리됩니다.",
    icon: "❌",
  },
  {
    title: "환불 정책",
    desc: "디지털 콘텐츠 특성상 구매 후 즉시 사용된 아이템은 환불이 불가합니다. 미사용 아이템에 한해 구매일로부터 7일 이내 환불 요청이 가능합니다.",
    icon: "💸",
  },
  {
    title: "정기 구독 해지",
    desc: "구독 상품은 구글 플레이 / 앱스토어의 구독 관리 메뉴에서 직접 해지하실 수 있습니다.",
    icon: "📅",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {faqItems.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-white/5 transition"
          >
            <span className="font-semibold text-white">{item.question}</span>
            <span className="text-pink-400 text-xl ml-4">{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-sm text-white/70 leading-relaxed border-t border-white/10 pt-4">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? (
    <div className="text-center py-20">
      <p className="text-4xl mb-4">✅</p>
      <h3 className="text-2xl font-bold text-pink-400 mb-2">문의가 접수되었습니다</h3>
      <p className="text-white/60">영업일 기준 1~3일 내로 이메일로 답변드립니다.</p>
      <button
        onClick={() => setSubmitted(false)}
        className="mt-8 px-6 py-3 rounded-full border border-pink-500/40 hover:bg-pink-500 transition text-sm"
      >
        새 문의 작성
      </button>
    </div>
  ) : (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div>
        <label className="block text-sm text-white/60 mb-2">문의 유형</label>
        <select required className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500">
          <option value="">선택해주세요</option>
          <option>계정 문제</option>
          <option>결제 문제</option>
          <option>버그 신고</option>
          <option>기타</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-2">이메일</label>
        <input
          type="email"
          required
          placeholder="답변 받을 이메일 주소"
          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-2">닉네임 (선택)</label>
        <input
          type="text"
          placeholder="인게임 닉네임"
          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-2">문의 내용</label>
        <textarea
          required
          rows={6}
          placeholder="문의 내용을 상세히 작성해주세요."
          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition"
      >
        문의 접수
      </button>
    </form>
  );
}

function CardSection({ items }: { items: { title: string; desc: string; icon: string }[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, i) => (
        <div key={i} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-pink-500/40 transition">
          <div className="text-3xl mb-3">{item.icon}</div>
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function CSPage() {
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">

        {/* 헤더 */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-500 font-semibold text-sm hover:bg-pink-500 hover:text-white transition">← 메인으로</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mt-4 mb-2">고객센터</h1>
          <p className="text-white/50">무엇을 도와드릴까요?</p>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex gap-2 flex-wrap mb-10 border-b border-white/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        {activeTab === "faq" && <FAQSection />}
        {activeTab === "contact" && <ContactSection />}
        {activeTab === "account" && <CardSection items={accountItems} />}
        {activeTab === "payment" && <CardSection items={paymentItems} />}

      </div>
    </main>
  );
}
