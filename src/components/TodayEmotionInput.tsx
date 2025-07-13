'use client';
import React, { useState } from "react";
import EmotionSelector from "./EmotionSelector";
import { EmotionLog } from "@/types/emotion";

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getLast7Logs(): EmotionLog[] {
  const logs: EmotionLog[] = JSON.parse(localStorage.getItem("emotionLogs") || "[]");
  return logs
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 7)
    .reverse();
}

export default function TodayEmotionInput() {
  const [selectedMainEmotion, setSelectedMainEmotion] = useState<string | null>(null);
  const [selectedSubEmotion, setSelectedSubEmotion] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [memo, setMemo] = useState("");
  const [saved, setSaved] = useState(false);
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmotionSelect = (mainEmotion: string, subEmotion: string, question: string) => {
    setSelectedMainEmotion(mainEmotion);
    setSelectedSubEmotion(subEmotion);
    setQuestion(question);
  };

  const handleSave = async () => {
    if (!selectedMainEmotion || !selectedSubEmotion) return;
    
    const today = getToday();
    const data: EmotionLog = {
      id: Date.now().toString(),
      date: today,
      mainEmotion: selectedMainEmotion,
      subEmotion: selectedSubEmotion,
      text: memo,
      score: 5, // 기본값, 나중에 점수 입력 기능 추가 가능
      timestamp: Date.now(),
    };
    
    const prev: EmotionLog[] = JSON.parse(localStorage.getItem("emotionLogs") || "[]");
    const filtered = prev.filter((item) => item.date !== today);
    const next = [...filtered, data];
    localStorage.setItem("emotionLogs", JSON.stringify(next));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    setMemo("");
    setSelectedMainEmotion(null);
    setSelectedSubEmotion(null);
    setQuestion("");
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
    } catch {
      setAiComment('AI 코멘트 요청 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedMainEmotion(null);
    setSelectedSubEmotion(null);
    setQuestion("");
    setMemo("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white max-w-sm mx-auto relative p-4">
      <h1 className="text-lg font-bold text-center mt-6 mb-4">오늘의 감정을 기록해보세요</h1>
      
      {!selectedMainEmotion ? (
        <EmotionSelector onEmotionSelect={handleEmotionSelect} />
      ) : (
        <div className="w-full space-y-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">
              {selectedMainEmotion} - {selectedSubEmotion}
            </div>
            <div className="text-sm text-gray-600 mb-3">{question}</div>
            <button
              onClick={handleReset}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              감정 다시 선택하기
            </button>
          </div>
          
          <div className="w-full">
            <textarea
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              rows={3}
              placeholder="이 감정을 느낀 구체적인 이유나 상황을 적어주세요..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={200}
            />
            <div className="text-xs text-gray-500 text-right mt-1">
              {memo.length}/200
            </div>
          </div>
        </div>
      )}
      
      {selectedMainEmotion && (
        <button
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm py-3 rounded-lg font-semibold text-white transition
            ${memo.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}
          `}
          disabled={!memo.trim() || loading}
          onClick={handleSave}
        >
          {loading ? 'AI 코멘트 생성 중...' : '저장하기'}
        </button>
      )}
      
      {saved && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          감정이 저장되었습니다! 🎉
        </div>
      )}
      
      {aiComment && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-gray-800 text-sm whitespace-pre-line">
          <div className="font-semibold mb-2">💭 AI 코멘트</div>
          {aiComment}
        </div>
      )}
    </div>
  );
} 