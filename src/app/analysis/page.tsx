'use client';
import LogoHeader from '@/components/LogoHeader';
import EmotionTrendGraph from '@/components/EmotionTrendGraph';
import WeeklySummaryCard from '@/components/WeeklySummaryCard';
import EmotionBarChart from '@/components/EmotionBarChart';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EmotionLog } from '@/types/emotion';
import EmotionWordCloud from '@/components/EmotionWordCloud';

export default function AnalysisPage() {
  const [logs, setLogs] = useState<EmotionLog[]>([]);
  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
    setLogs(storedLogs);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col items-stretch px-0 pb-8">
        {/* 상단 네비/로고/이전버튼 */}
        <div className="flex items-center justify-between px-4 pt-4 mb-4">
          <LogoHeader />
          <Link href="/" className="text-blue-500 text-sm font-semibold">이전 &gt;</Link>
        </div>
        {/* 최근 7일 감정그래프 */}
        <section className="bg-gray-50 rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">최근 7일 감정그래프</h2>
          <EmotionTrendGraph />
        </section>
        {/* 감정 요약 카드 */}
        <section className="bg-gray-50 rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">감정 요약 카드</h2>
          <ul className="space-y-1 text-sm">
            <li>● <WeeklySummaryCard /></li>
          </ul>
        </section>
        {/* 감정 분포 및 시각화 */}
        <section className="bg-gray-50 rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">감정 분포 및 시각화</h2>
          <EmotionBarChart logs={logs} />
        </section>
        {/* 감정 워드클라우드 */}
        <section className="bg-gray-50 rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">감정 워드클라우드</h2>
          <EmotionWordCloud logs={logs} />
        </section>
      </div>
    </div>
  );
} 