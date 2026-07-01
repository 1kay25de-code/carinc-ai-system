import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("audio") as File;

    if (!file) {
      return NextResponse.json(
        { error: "音声ファイルがありません" },
        { status: 400 }
      );
    }

    const transcription = await groq.audio.transcriptions.create({
      file,
      model: "whisper-large-v3",
      language: "ja",
      response_format: "json",
      prompt:
        "これは中古車販売店の商談です。車種名や販売用語を正確に認識してください。アルファード、ヴェルファイア、ハリアー、プリウス、ヤリスクロス、ノア、ヴォクシー、セレナ、ステップワゴン、残価設定ローン、下取り、査定、保証、車検。",
    });

    return NextResponse.json({
      transcript: transcription.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "文字起こしに失敗しました",
      },
      {
        status: 500,
      }
    );
  }
}
