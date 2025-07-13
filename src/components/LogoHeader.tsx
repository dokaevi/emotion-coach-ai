'use client';

export default function LogoHeader() {
  return (
    <div className="flex flex-col items-start mb-2 mt-2 pl-2">
      <div className="flex items-center gap-2 mb-1">
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="#6366F1"/>
          <path d="M8 18c2-2 6-2 8 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="11" cy="12" r="1.5" fill="#fff"/>
          <circle cx="17" cy="12" r="1.5" fill="#fff"/>
        </svg>
        <span className="text-lg font-bold tracking-tight">감정코칭AI</span>
      </div>
      <div className="text-xs text-gray-500">나의 감정을 기록하고, AI와 함께 성장해요</div>
    </div>
  );
} 