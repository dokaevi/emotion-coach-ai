'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EmotionLog } from '@/types/emotion';

interface EmotionBarChartProps {
  logs: EmotionLog[];
}

export default function EmotionBarChart({ logs }: EmotionBarChartProps) {
  // 감정별 빈도 계산
  const emotionCounts: Record<string, number> = {};
  logs.forEach(log => {
    emotionCounts[log.mainEmotion] = (emotionCounts[log.mainEmotion] || 0) + 1;
  });

  // 차트 데이터 변환
  const chartData = Object.entries(emotionCounts).map(([emotion, count]) => ({
    emotion,
    count,
  }));

  // 감정별 색상 매핑
  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      '기쁨': '#FFD700',
      '슬픔': '#87CEEB',
      '분노': '#FF6B6B',
      '불안': '#FFA500',
      '피로': '#8B4513',
      '안정': '#90EE90',
    };
    return colors[emotion] || '#3B82F6';
  };

  if (chartData.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow p-4 mt-4">
        <h3 className="text-base font-semibold mb-2 text-center">감정 분포</h3>
        <div className="text-center text-gray-500 py-8">
          아직 감정 기록이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow p-4 mt-4">
      <h3 className="text-base font-semibold mb-2 text-center">감정 분포</h3>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="emotion" 
              tick={{ fontSize: 12 }}
              height={40}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              width={30}
            />
            <Tooltip />
            <Bar 
              dataKey="count" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 