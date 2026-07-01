"use client";

import { useEffect, useRef, useState } from "react";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState("");

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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
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

      recorder.onstop = async () => {
        try {
          const blob = new Blob(chunksRef.current, {
            type: "audio/webm",
          });

          const formData = new FormData();
          formData.append("audio", blob, "record.webm");

          console.log("音声送信開始");

          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          if (data.transcript) {
            setTranscript(data.transcript);

            const aiRes = await fetch("/api/analyze", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                transcript: data.transcript,
              }),
            });

            const aiData = await aiRes.json();

            setAnalysis(aiData.analysis);

            alert("AI分析完了！");
          } else {
            alert("文字起こしに失敗しました");
          }
        } catch (err) {
          console.error(err);
          alert("API通信エラー");
        }
      };

      recorder.start();

      mediaRecorderRef.current = recorder;

      setTranscript("");
      setAnalysis("");
      setRecording(true);
      setPaused(false);
      setSeconds(0);
    } catch (error) {
      console.error(error);
      alert("マイクが使用できません。");
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

      <div className="mt-8">

        <h3 className="text-xl font-bold mb-2">
          文字起こし結果
        </h3>

        <textarea
          className="w-full h-60 border rounded-lg p-4"
          value={transcript}
          readOnly
        />

      </div>

      <div className="mt-8">

        <h3 className="text-xl font-bold mb-2">
          AI商談分析
        </h3>

        <textarea
          className="w-full h-80 border rounded-lg p-4"
          value={analysis}
          readOnly
        />

      </div>

    </div>
  );
}
