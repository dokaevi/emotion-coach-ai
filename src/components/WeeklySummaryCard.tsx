'use client';
import React from 'react';

const EMOTION_SCORE: Record<string, number> = {
  '기쁨': 9, '평온': 7, '감사': 8, '무기력': 3, '짜증': 4, '불안': 2, '슬픔': 1, '피곤': 2,
};

function getWeeklyLogs() {
  const logs = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
  return logs
    .sort((a: any, b: any) => b.date.localeCompare(a.date))
    .slice(0, 7);
}

function getTop3Emotions(logs: any[]) {
  const count: Record<string, number> = {};
  logs.forEach(l => { count[l.emotion] = (count[l.emotion] || 0) + 1; });
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([emotion, cnt]) => `${emotion} (${cnt}회)`);
}

function getAvgScore(logs: any[]) {
  const scores = logs.map(l => EMOTION_SCORE[l.emotion] ?? 5);
  if (!scores.length) return '-';
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
}

function getKeywords(logs: any[]) {
  // 메모에서 단어 빈도 상위 3개 추출 (간단 버전)
  const all = logs.map(l => l.memo).join(' ');
  const words = all.split(/\s+/).filter(w => w.length > 1);
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word)
    .join(', ') || '-';
}

export default function WeeklySummaryCard() {
  const logs = getWeeklyLogs();
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div>
        <span className="font-semibold">자주 느낀 감정 TOP3:</span> {getTop3Emotions(logs).join(', ')}
      </div>
      <div>
        <span className="font-semibold">감정 점수 평균:</span> {getAvgScore(logs)}
      </div>
      <div>
        <span className="font-semibold">감정 키워드 요약:</span> {getKeywords(logs)}
      </div>
    </div>
  );
} 