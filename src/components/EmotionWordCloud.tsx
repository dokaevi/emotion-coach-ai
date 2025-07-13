'use client';
import React from 'react';
import { EmotionLog } from '@/types/emotion';
import dynamic from 'next/dynamic';

const ReactWordcloud = dynamic(() => import('react-wordcloud'), { ssr: false });

interface EmotionWordCloudProps {
  logs: EmotionLog[];
}

export default function EmotionWordCloud({ logs }: EmotionWordCloudProps) {
  // 메모에서 단어 빈도 상위 30개 추출
  const all = logs.map(l => l.text).join(' ');
  const words = all.split(/\s+/).filter(w => w.length > 1);
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const topWords = Object.entries(freq)
    .filter(([text, value]) => text && value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([text, value]) => ({ text, value }));

  if (!topWords || topWords.length === 0) {
    return <div className="text-gray-400 text-center py-6">아직 워드클라우드 데이터가 없습니다.</div>;
  }

  // 일반 배열로 선언
  const colors = ['#6366f1', '#60a5fa', '#818cf8', '#a5b4fc', '#fbbf24', '#f472b6', '#34d399', '#f87171'];
  const options = {
    fontFamily: 'Pretendard, Noto Sans KR, sans-serif',
    fontSizes: [18, 48] as [number, number],
    rotations: 2,
    rotationAngles: [0, 90] as [number, number],
    // scale: 'sqrt', // 기본값 사용
    spiral: 'archimedean' as const,
    padding: 2,
    colors,
  };

  return (
    <div className="w-full flex justify-center items-center" style={{ minHeight: 220 }}>
      <div style={{ width: '100%', height: 220 }}>
        <ReactWordcloud words={topWords} options={options} />
      </div>
    </div>
  );
} 