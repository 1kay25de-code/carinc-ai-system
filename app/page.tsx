"use client";

import { useState } from "react";
import Recorder from "@/components/Recorder";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const analyze = () => {
    setLoading(true);
    setAnalyzed(false);

    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">

        {/* タイトル */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          🚗 CARINC AI商談分析システム
        </h1>

        {/* 商談情報 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            商談情報
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="font-bold">営業担当</label>
              <select className="border w-full p-3 rounded-lg mt-2">
                <option>山田 太郎</option>
                <option>佐藤 次郎</option>
                <option>鈴木 一郎</option>
              </select>
            </div>

            <div>
              <label className="font-bold">店舗</label>
              <select className="border w-full p-3 rounded-lg mt-2">
                <option>千葉北店</option>
                <option>木更津店</option>
                <option>成田店</option>
              </select>
            </div>

            <div>
              <label className="font-bold">お客様名</label>
              <input
                className="border w-full p-3 rounded-lg mt-2"
                placeholder="例：山田様"
              />
            </div>

            <div>
              <label className="font-bold">車種</label>
              <input
                className="border w-full p-3 rounded-lg mt-2"
                placeholder="例：アルファード"
              />
            </div>

          </div>

        </div>

        {/* 録音 */}
        <Recorder />

        {/* 商談内容 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            📝 商談内容
          </h2>

          <textarea
            className="border w-full h-72 rounded-lg p-4"
            placeholder="ここに商談の文字起こしを貼り付けてください。"
          />

          <button
            onClick={analyze}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 rounded-xl"
          >
            🤖 AI分析する
          </button>

        </div>

        {/* AI分析結果 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            📊 AI分析結果
          </h2>

          {loading && (
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                🤖 AI分析中...
              </p>
              <p className="mt-3 text-gray-500">
                商談内容を解析しています...
              </p>
            </div>
          )}

          {!loading && !analyzed && (
            <div className="text-center">
              <p className="text-6xl font-bold text-blue-600">--</p>
              <p className="text-gray-500 mt-2">
                AI分析を実行してください
              </p>
            </div>
          )}

          {!loading && analyzed && (

            <div>

              <div className="text-center">

                <h3 className="text-6xl font-bold text-green-600">
                  92点
                </h3>

                <p className="text-gray-500 mt-2">
                  総合評価
                </p>

              </div>

              <div className="mt-8 space-y-2 text-lg">

                <div>初期アイスブレイク　9 /10</div>
                <div>ニーズの深掘り　10 /10</div>
                <div>不安・懸念の解消　8 /10</div>
                <div>付帯説明　13 /15</div>
                <div>テストクロージング　8 /10</div>
                <div>断られた後のリカバリー　12 /15</div>
                <div>次ステップの提示　9 /10</div>
                <div>発言比率＆言葉遣い　9 /10</div>
                <div>感情・トーン分析　9 /10</div>

              </div>

              <div className="bg-green-100 rounded-lg p-5 mt-8">

                <h3 className="font-bold text-xl">
                  ✅ Good
                </h3>

                <ul className="list-disc ml-6 mt-3">
                  <li>アイスブレイクが自然でした。</li>
                  <li>予算確認が丁寧でした。</li>
                  <li>修復歴について安心感を与えられています。</li>
                </ul>

              </div>

              <div className="bg-red-100 rounded-lg p-5 mt-6">

                <h3 className="font-bold text-xl">
                  ⚠ 改善点
                </h3>

                <ul className="list-disc ml-6 mt-3">
                  <li>録音口上がありません。</li>
                  <li>任意保険証券の確認がありません。</li>
                  <li>テストクロージングを入れましょう。</li>
                </ul>

              </div>

            </div>

          )}

        </div>

      </div>
    </main>
  );
}