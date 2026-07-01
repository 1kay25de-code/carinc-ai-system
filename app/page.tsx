"use client";

import Recorder from "@/components/Recorder";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">

        <Dashboard />

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          🚗 CARINC AI商談分析システム
        </h1>

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
                <option>つくば店</option>
                <option>宇都宮店</option>
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

        <Recorder />

      </div>
    </main>
  );
}