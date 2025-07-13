'use client';
import TodayEmotionInput from '@/components/TodayEmotionInput';
import LogoHeader from '@/components/LogoHeader';
import Link from 'next/link';
import { useState } from 'react';
import { EMOTION_CATEGORIES } from '@/types/emotion';

const analysisCards = [
  { id: 'score', label: '지난7일 감정점수', icon: '📈' },
  { id: 'graph', label: '최근7일 감정그래프', icon: '📊' },
  { id: 'summary', label: '감정 요약 카드', icon: '📝' },
  { id: 'dist', label: '감정 분포/시각화', icon: '🌈' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col items-stretch px-0 pb-8">
        <LogoHeader />
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
        <div className="text-center text-base font-semibold mb-3">
          오늘의 감정을 선택해 기록해보세요
        </div>
        {/* 감정카드: 선택 전만 노출 */}
        {!selectedCategory && (
          <div className="grid grid-cols-3 gap-4 px-4 mb-8">
            {EMOTION_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm text-lg font-medium"
                style={{ borderColor: category.color + '40' }}
              >
                <span className="text-3xl mb-1">{category.emoji}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        )}
        {/* 감정 입력 프로세스: 감정카드 선택 시 한 번에 노출 */}
        {selectedCategory && (
          <div className="px-4">
            <TodayEmotionInput initialMainEmotion={selectedCategory} onReset={() => setSelectedCategory(null)} />
          </div>
        )}
      </div>
    </div>
  );
}
