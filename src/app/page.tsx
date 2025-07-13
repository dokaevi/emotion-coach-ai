'use client';
import TodayEmotionInput from '@/components/TodayEmotionInput';
import LogoHeader from '@/components/LogoHeader';
import Link from 'next/link';
import { useState } from 'react';
import { EMOTION_CATEGORIES } from '@/types/emotion';

const analysisCards = [
  {
    id: 'score',
    label: '지난7일 감정점수',
    icon: '📈',
  },
  {
    id: 'graph',
    label: '최근7일 감정그래프',
    icon: '📊',
  },
  {
    id: 'summary',
    label: '감정 요약 카드',
    icon: '📝',
  },
  {
    id: 'dist',
    label: '감정 분포/시각화',
    icon: '🌈',
  },
];

export default function Home() {
  // 감정 선택 상태 관리 (감정 입력 UI 분리)
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col items-stretch px-0 pb-8">
        {/* 1. 로고/타이틀/서브카피 */}
        <LogoHeader />
        {/* 2. 분석 결과 카드 2x2 */}
        <div className="grid grid-cols-2 gap-4 px-4 mt-2 mb-8">
          {analysisCards.map(card => (
            <Link
              key={card.id}
              href={`/analysis#${card.id}`}
              className="flex flex-col items-center justify-center border border-blue-200 rounded-xl h-24 bg-white hover:bg-blue-50 transition shadow-sm text-center"
            >
              <span className="text-2xl mb-2">{card.icon}</span>
              <span className="font-semibold text-base">{card.label}</span>
            </Link>
          ))}
        </div>
        {/* 3. 감정 입력 안내문구 */}
        <div className="text-center text-base font-semibold mb-3">
          오늘의 감정을 선택해 기록해보세요
        </div>
        {/* 4. 감정카드 2x3 (메인 강조) */}
        <div className="grid grid-cols-3 gap-4 px-4 mb-8">
          {EMOTION_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => { setShowInput(true); }}
              className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm text-lg font-medium"
              style={{ borderColor: category.color + '40' }}
            >
              <span className="text-3xl mb-1">{category.emoji}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
        {/* 5. 감정 입력 UI (선택 시 노출) */}
        {showInput && (
          <div className="px-4">
            <TodayEmotionInput />
          </div>
        )}
      </div>
    </div>
  );
}
