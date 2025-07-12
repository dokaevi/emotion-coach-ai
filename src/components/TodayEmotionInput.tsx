'use client';
import React, { useState } from "react";

const EMOTIONS = [
  { key: "joy", label: "기쁨", emoji: "😊" },
  { key: "sad", label: "슬픔", emoji: "😢" },
  { key: "lethargy", label: "무기력", emoji: "😶‍🌫️" },
  { key: "annoyed", label: "짜증", emoji: "😠" },
  { key: "calm", label: "평온", emoji: "😌" },
];

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getLast7Logs() {
  const logs = JSON.parse(localStorage.getItem("emotionLogs") || "[]");
  return logs
    .sort((a: any, b: any) => b.date.localeCompare(a.date))
    .slice(0, 7)
    .reverse();
}

export default function TodayEmotionInput() {
  const [selected, setSelected] = useState<string | null>(null);
  const [memo, setMemo] = useState("");
  const [saved, setSaved] = useState(false);
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!selected) return;
    const today = getToday();
    const emotionObj = EMOTIONS.find(e => e.key === selected);
    const data = {
      date: today,
      emotion: emotionObj ? emotionObj.label : selected,
      memo,
    };
    const prev = JSON.parse(localStorage.getItem("emotionLogs") || "[]");
    const filtered = prev.filter((item: any) => item.date !== today);
    const next = [...filtered, data];
    localStorage.setItem("emotionLogs", JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    setMemo("");
    setSelected(null);
    setLoading(true);
    setAiComment(null);
    try {
      const logs = getLast7Logs();
      const res = await fetch('/api/ai-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs }),
      });
      const data = await res.json();
      setAiComment(data.comment || 'AI 코멘트 생성 실패');
    } catch (e) {
      setAiComment('AI 코멘트 요청 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white max-w-sm mx-auto relative">
      <h1 className="text-lg font-bold text-center mt-6 mb-4">오늘의 감정을 선택해주세요</h1>
      <div className="flex justify-center gap-3 mb-2">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.key}
            type="button"
            className={`flex flex-col items-center text-2xl transition-all
              ${selected === emotion.key
                ? "scale-110 border-2 border-blue-400 bg-blue-50 shadow"
                : "opacity-70"}
              rounded-full p-1`}
            onClick={() => setSelected(emotion.key)}
            aria-label={emotion.label}
          >
            {emotion.emoji}
            <span className="text-xs mt-0.5">{emotion.label}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="w-full px-4 mb-2">
          <textarea
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            rows={2}
            placeholder="무엇 때문에 그런 감정을 느꼈나요?"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={100}
          />
        </div>
      )}
      <button
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm py-3 rounded-lg font-semibold text-white transition
          ${selected ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}
        `}
        disabled={!selected || loading}
        onClick={handleSave}
      >
        {loading ? 'AI 코멘트 생성 중...' : '저장'}
      </button>
      {saved && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          저장되었습니다!
        </div>
      )}
      {aiComment && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-gray-800 text-sm whitespace-pre-line">
          {aiComment}
        </div>
      )}
    </div>
  );
} 