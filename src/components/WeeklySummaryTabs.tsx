'use client';
import React, { useState } from 'react';
import EmotionTrendGraph from './EmotionTrendGraph';
import WeeklySummaryCard from './WeeklySummaryCard';

export default function WeeklySummaryTabs() {
  const [tab, setTab] = useState<'graph' | 'summary'>('graph');
  return (
    <div className="w-full max-w-sm mx-auto mt-2 mb-2">
      <div className="flex justify-center gap-2 mb-2">
        <button
          className={`flex-1 py-2 rounded-t-lg font-semibold text-sm ${tab === 'graph' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setTab('graph')}
        >
          7일 감정 그래프
        </button>
        <button
          className={`flex-1 py-2 rounded-t-lg font-semibold text-sm ${tab === 'summary' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setTab('summary')}
        >
          감정 요약 카드
        </button>
      </div>
      <div className="bg-white rounded-b-xl shadow p-2">
        {tab === 'graph' ? <EmotionTrendGraph /> : <WeeklySummaryCard />}
      </div>
    </div>
  );
} 