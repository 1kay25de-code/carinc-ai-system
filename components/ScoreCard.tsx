type Props = {
  score: number;
};

export default function ScoreCard({ score }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📊 AI分析結果
      </h2>

      <div className="text-center">

        <div className="text-7xl font-bold text-blue-600">
          {score}点
        </div>

        <div className="w-full bg-gray-200 rounded-full h-6 mt-6">

          <div
            className="bg-green-500 h-6 rounded-full"
            style={{ width: `${score}%` }}
          />

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div>初期アイスブレイク</div>
        <div className="text-right">9 / 10</div>

        <div>ニーズ深掘り</div>
        <div className="text-right">9 / 10</div>

        <div>不安解消</div>
        <div className="text-right">8 / 10</div>

        <div>付帯説明</div>
        <div className="text-right">13 / 15</div>

        <div>クロージング</div>
        <div className="text-right">8 / 10</div>

        <div>リカバリー</div>
        <div className="text-right">12 / 15</div>

        <div>次ステップ</div>
        <div className="text-right">9 / 10</div>

        <div>言葉遣い</div>
        <div className="text-right">10 / 10</div>

        <div>感情分析</div>
        <div className="text-right">9 / 10</div>

      </div>

      <hr className="my-8" />

      <h3 className="font-bold text-green-600 text-xl">
        ✅ Good
      </h3>

      <ul className="list-disc ml-6 mt-2">
        <li>来店経緯を自然に確認できている</li>
        <li>予算確認ができている</li>
        <li>丁寧な敬語で話せている</li>
      </ul>

      <h3 className="font-bold text-red-600 text-xl mt-8">
        ⚠ 改善点
      </h3>

      <ul className="list-disc ml-6 mt-2">
        <li>録音口上がありません</li>
        <li>任意保険証券の確認がありません</li>
        <li>テストクロージングがありません</li>
      </ul>

    </div>
  );
}