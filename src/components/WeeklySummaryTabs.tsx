'use client';
import WeeklySummaryCard from './WeeklySummaryCard';
import { useState } from 'react';

export default function WeeklySummaryTabs() {
  // 탭 없이 감정 요약 카드만 단일로 노출
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-2">감정 요약 카드</h2>
      <WeeklySummaryCard />
    </div>
  );
} 