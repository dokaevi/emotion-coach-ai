'use client';
import React, { useEffect, useState } from 'react';
import { EmotionLog } from '@/types/emotion';

function getTop3Emotions(logs: EmotionLog[]) {
  const count: Record<string, number> = {};
  logs.forEach(l => { 
    count[l.mainEmotion] = (count[l.mainEmotion] || 0) + 1; 
  });
  const sorted = Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  if (sorted.length === 0) return '-';
  return sorted.map(([emotion, cnt]) => `${emotion} (${cnt}회)`).join(', ');
}

function getTop3SubEmotions(logs: EmotionLog[]) {
  const count: Record<string, number> = {};
  logs.forEach(l => { 
    count[l.subEmotion] = (count[l.subEmotion] || 0) + 1; 
  });
  const sorted = Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  if (sorted.length === 0) return '-';
  return sorted.map(([emotion, cnt]) => `${emotion} (${cnt}회)`).join(', ');
}

function getAvgScore(logs: EmotionLog[]) {
  if (!logs.length) return '-';
  const scores = logs.map(l => l.score);
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
}

function getKeywords(logs: EmotionLog[]) {
  const all = logs.map(l => l.text).join(' ');
  const words = all.split(/\s+/).filter(w => w.length > 1);
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  if (sorted.length === 0) return '-';
  return sorted.map(([word]) => word).join(', ');
}

export default function WeeklySummaryCard() {
  const [logs, setLogs] = useState<EmotionLog[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logs: EmotionLog[] = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
      setLogs(logs.sort((a, b) => b.timestamp - a.timestamp).slice(0, 7));
    }
  }, []);
  return (
    <div className="flex flex-col gap-1 text-sm">
      <div><b>주요 감정 TOP3:</b> {getTop3Emotions(logs)}</div>
      <div><b>세부 감정 TOP3:</b> {getTop3SubEmotions(logs)}</div>
      <div><b>감정 점수 평균:</b> {getAvgScore(logs)}</div>
      <div><b>감정 키워드 요약:</b> {getKeywords(logs)}</div>
    </div>
  );
} 