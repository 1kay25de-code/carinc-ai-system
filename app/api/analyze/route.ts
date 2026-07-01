import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    const prompt = `
あなたは中古車販売店のトップ営業マネージャーです。

以下の商談を分析してください。

=====================
${transcript}
=====================

以下の形式で回答してください。

総合点：
成約率：

良かった点
・
・
・

改善点
・
・
・

次回アドバイス
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      analysis: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AI分析に失敗しました",
      },
      {
        status: 500,
      }
    );
  }
}