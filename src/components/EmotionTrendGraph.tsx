'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 감정별 점수 매핑 (예시)
const EMOTION_SCORE: Record<string, number> = {
  '기쁨': 9,
  '평온': 7,
  '감사': 8,
  '무기력': 3,
  '짜증': 4,
  '불안': 2,
  '슬픔': 1,
  '피곤': 2,
};

interface EmotionLog {
  date: string;
  emotion: string;
  memo: string;
}

function getLast7Days() {
  const arr = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    arr.push(d.toISOString().slice(5, 10)); // MM-DD
  }
  return arr;
}

export default function EmotionTrendGraph() {
  const [data, setData] = useState<{ date: string; score: number }[]>([]);

  useEffect(() => {
    const logs: EmotionLog[] = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
    const days = getLast7Days();
    // 날짜별로 emotion 점수 매핑
    const mapped = days.map((d) => {
      const log = logs.find((l) => l.date.slice(5, 10) === d);
      return {
        date: d,
        score: log ? (EMOTION_SCORE[log.emotion] ?? 5) : 0,
      };
    });
    setData(mapped);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow p-2 mt-2 mb-4">
      <h2 className="text-base font-semibold mb-1 text-center">지난 7일 감정 점수</h2>
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} height={24} />
            <YAxis domain={[0, 10]} tickCount={11} tick={{ fontSize: 11 }} width={28} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 