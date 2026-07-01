export default function Dashboard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        📊 本日の営業ダッシュボード
      </h2>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-blue-100 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-blue-700">
            38
          </div>
          <div>本日の商談</div>
        </div>

        <div className="bg-green-100 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-green-700">
            87点
          </div>
          <div>平均点</div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-yellow-700">
            46%
          </div>
          <div>成約率</div>
        </div>

        <div className="bg-red-100 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-red-700">
            98%
          </div>
          <div>録音率</div>
        </div>

      </div>

    </div>
  );
}