import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "이메일 서비스가 설정되지 않았습니다." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { inquiryType, email, nickname, message } = await req.json();

    if (!inquiryType || !email || !message) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "inquirer@arotech.info",
      to: process.env.INQUIRY_TO_EMAIL || "arotech2024@arotech.info",
      replyTo: email,
      subject: `[Dear Idol 문의] ${inquiryType} - ${nickname || email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Dear Idol 고객 문의</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>문의 유형</b></td><td style="padding: 8px; border: 1px solid #ddd;">${inquiryType}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>이메일</b></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>닉네임</b></td><td style="padding: 8px; border: 1px solid #ddd;">${nickname || "-"}</td></tr>
          </table>
          <h3 style="margin-top: 24px;">문의 내용</h3>
          <p style="white-space: pre-wrap; padding: 16px; background: #f5f5f5; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "이메일 전송 실패" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
