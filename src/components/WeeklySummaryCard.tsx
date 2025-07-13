'use client';
import React from 'react';
import { EmotionLog } from '@/types/emotion';

const EMOTION_SCORE: Record<string, number> = {
  '기쁨': 9, '평온': 7, '감사': 8, '무기력': 3, '불안': 2, '슬픔': 1, '피곤': 2,
  '뿌듯함': 9, '감사함': 8, '설렘': 8, '만족함': 7,
  '외로움': 2, '실망': 3, '우울함': 1, '그리움': 4,
  '답답함': 3, '짜증': 4, '격분': 2, '원망': 2,
  '걱정': 3, '긴장': 4, '압도됨': 2, '불확실함': 3,
  '지침': 2, '탈진': 2, '졸림': 3, '번아웃': 1,
  '평온함': 8, '편안함': 7, '균형잡힘': 8, '집중됨': 7,
};

function getWeeklyLogs(): EmotionLog[] {
  const logs: EmotionLog[] = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
  return logs
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 7);
}

function getTop3Emotions(logs: EmotionLog[]) {
  const count: Record<string, number> = {};
  logs.forEach(l => { 
    count[l.mainEmotion] = (count[l.mainEmotion] || 0) + 1; 
  });
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([emotion, cnt]) => `${emotion} (${cnt}회)`);
}

function getTop3SubEmotions(logs: EmotionLog[]) {
  const count: Record<string, number> = {};
  logs.forEach(l => { 
    count[l.subEmotion] = (count[l.subEmotion] || 0) + 1; 
  });
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([emotion, cnt]) => `${emotion} (${cnt}회)`);
}

function getAvgScore(logs: EmotionLog[]) {
  if (!logs.length) return '-';
  const scores = logs.map(l => l.score);
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
}

function getKeywords(logs: EmotionLog[]) {
  // 메모에서 단어 빈도 상위 3개 추출 (간단 버전)
  const all = logs.map(l => l.text).join(' ');
  const words = all.split(/\s+/).filter(w => w.length > 1);
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word)
    .join(', ') || '-';
}

// 워드클라우드용 감정 빈도 계산 함수
function getEmotionFrequencies(logs: EmotionLog[]) {
  const freq: Record<string, number> = {};
  logs.forEach(l => { 
    freq[l.mainEmotion] = (freq[l.mainEmotion] || 0) + 1; 
  });
  return freq;
}

// 워드클라우드 시각화 컴포넌트
function EmotionWordCloud({ freq }: { freq: Record<string, number> }) {
  const max = Math.max(...Object.values(freq), 1);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0' }}>
      {Object.entries(freq).map(([emotion, count]) => (
        <span
          key={emotion}
          style={{
            fontSize: 14 + (count / max) * 26, // 14~40px
            fontWeight: 'bold',
            color: '#2563eb',
            opacity: 0.7 + (count / max) * 0.3,
            lineHeight: 1.2,
          }}
        >
          {emotion}
        </span>
      ))}
    </div>
  );
}

export default function WeeklySummaryCard() {
  const logs = getWeeklyLogs();
  const freq = getEmotionFrequencies(logs);
  
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div>
        <span className="font-semibold">주요 감정 TOP3:</span> {getTop3Emotions(logs).join(', ')}
      </div>
      <div>
        <span className="font-semibold">세부 감정 TOP3:</span> {getTop3SubEmotions(logs).join(', ')}
      </div>
      <div>
        <span className="font-semibold">감정 점수 평균:</span> {getAvgScore(logs)}
      </div>
      <div>
        <span className="font-semibold">감정 워드클라우드:</span>
        <EmotionWordCloud freq={freq} />
      </div>
      <div>
        <span className="font-semibold">감정 키워드 요약:</span> {getKeywords(logs)}
      </div>
    </div>
  );
} 