'use client';
import { useState, useEffect } from 'react';
import TodayEmotionInput from '@/components/TodayEmotionInput';
import EmotionTrendGraph from '@/components/EmotionTrendGraph';
import WeeklySummaryTabs from '@/components/WeeklySummaryTabs';
import EmotionBarChart from '@/components/EmotionBarChart';
import { EmotionLog } from '@/types/emotion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'input' | 'analysis'>('input');
  const [logs, setLogs] = useState<EmotionLog[]>([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
    setLogs(storedLogs);
  }, []);

  const handleLogUpdate = () => {
    const storedLogs = JSON.parse(localStorage.getItem('emotionLogs') || '[]');
    setLogs(storedLogs);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 text-center">
          <h1 className="text-xl font-bold">감정 코칭 AI</h1>
          <p className="text-sm opacity-90">당신의 감정을 기록하고 이해해보세요</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('input')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'input'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            감정 입력
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'analysis'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            분석 결과
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-4">
          {activeTab === 'input' ? (
            <TodayEmotionInput />
          ) : (
            <div className="space-y-4">
              <EmotionTrendGraph />
              <EmotionBarChart logs={logs} />
              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-base font-semibold mb-3">주간 요약</h3>
                <WeeklySummaryTabs />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
