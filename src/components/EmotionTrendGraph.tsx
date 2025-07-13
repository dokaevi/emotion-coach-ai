'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EmotionLog } from '@/types/emotion';

// 감정별 점수 매핑 (예시)
const EMOTION_SCORE: Record<string, number> = {
  '기쁨': 9,
  '평온': 7,
  '감사': 8,
  '무기력': 3,
  '불안': 2,
  '슬픔': 1,
  '피곤': 2,
  '뿌듯함': 9, '감사함': 8, '설렘': 8, '만족함': 7,
  '외로움': 2, '실망': 3, '우울함': 1, '그리움': 4,
  '답답함': 3, '짜증': 4, '격분': 2, '원망': 2,
  '걱정': 3, '긴장': 4, '압도됨': 2, '불확실함': 3,
  '지침': 2, '탈진': 2, '졸림': 3, '번아웃': 1,
  '평온함': 8, '편안함': 7, '균형잡힘': 8, '집중됨': 7,
};

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
        score: log ? log.score : 0,
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