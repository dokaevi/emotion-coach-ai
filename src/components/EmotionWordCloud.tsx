'use client';
import React, { useEffect, useRef, useState } from 'react';
import { EmotionLog } from '@/types/emotion';
import cloud from 'd3-cloud';

interface EmotionWordCloudProps {
  logs: EmotionLog[];
}

const COLORS = ['#6366f1', '#60a5fa', '#818cf8', '#a5b4fc', '#fbbf24', '#f472b6', '#34d399', '#f87171'];
const FONT_FAMILY = 'Pretendard, Noto Sans KR, sans-serif';

export default function EmotionWordCloud({ logs }: EmotionWordCloudProps) {
  const [words, setWords] = useState<{ text: string; value: number }[]>([]);
  const [layout, setLayout] = useState<any[]>([]);
  const [ready, setReady] = useState(false);
  const width = 320;
  const height = 220;

  useEffect(() => {
    // 1. 단어 빈도 계산
    const all = logs.map(l => l.text).join(' ');
    const split = all.split(/\s+/).filter(w => w.length > 1);
    const freq: Record<string, number> = {};
    split.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const topWords = Object.entries(freq)
      .filter(([text, value]) => text && value > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([text, value]) => ({ text, value }));
    setWords(topWords);
  }, [logs]);

  useEffect(() => {
    if (!words.length) {
      setLayout([]);
      setReady(false);
      return;
    }
    setReady(false);
    cloud()
      .size([width, height])
      .words(words.map(d => ({
        text: d.text,
        size: 18 + Math.sqrt(d.value) * 18,
        value: d.value,
      })))
      .padding(2)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font(FONT_FAMILY)
      .fontSize(d => d.size as number)
      .on('end', (out: any[]) => {
        setLayout(out);
        setReady(true);
      })
      .start();
  }, [words]);

  if (!words.length) {
    return <div className="text-gray-400 text-center py-6">아직 워드클라우드 데이터가 없습니다.</div>;
  }

  return (
    <div className="w-full flex justify-center items-center" style={{ minHeight: height }}>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {ready && layout.map((w, i) => (
            <text
              key={w.text + i}
              textAnchor="middle"
              fontFamily={FONT_FAMILY}
              fontSize={w.size}
              fill={COLORS[i % COLORS.length]}
              fontWeight={700}
              transform={`translate(${w.x},${w.y}) rotate(${w.rotate})`}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              {w.text}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
} 