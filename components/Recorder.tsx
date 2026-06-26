"use client";

import { useEffect, useRef, useState } from "react";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording, paused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        console.log("録音完了", blob);

        // 次回Whisperへ送信します
      };

      recorder.start();

      mediaRecorderRef.current = recorder;

      setRecording(true);
      setPaused(false);
      setSeconds(0);
    } catch (error) {
      alert("マイクが使用できません。");
      console.error(error);
    }
  };

  const pauseRecording = () => {
    mediaRecorderRef.current?.pause();
    setPaused(true);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current?.resume();
    setPaused(false);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    mediaRecorderRef.current?.stream
      .getTracks()
      .forEach((track) => track.stop());

    setRecording(false);
    setPaused(false);

    alert("録音を終了しました");
  };

  const formatTime = () => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={startRecording}
          disabled={recording}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl disabled:bg-gray-400"
        >
          🎙 商談開始
        </button>

        <button
          onClick={pauseRecording}
          disabled={!recording || paused}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl disabled:bg-gray-400"
        >
          ⏸ 一時停止
        </button>

        <button
          onClick={resumeRecording}
          disabled={!paused}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:bg-gray-400"
        >
          ▶ 再開
        </button>

        <button
          onClick={stopRecording}
          disabled={!recording}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl disabled:bg-gray-400"
        >
          ■ 商談終了
        </button>

      </div>

      <div className="text-center mt-8">

        <h2 className="text-3xl font-bold">

          {paused
            ? "⏸ 一時停止中"
            : recording
            ? "🔴 録音中"
            : "待機中"}

        </h2>

        <p className="text-5xl font-bold mt-4">
          {formatTime()}
        </p>

      </div>

    </div>
  );
}