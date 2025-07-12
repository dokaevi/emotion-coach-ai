'use client';
import TodayEmotionInput from "@/components/TodayEmotionInput";
import WeeklySummaryTabs from "@/components/WeeklySummaryTabs";
import React from "react";

export default function LogPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <WeeklySummaryTabs />
      <TodayEmotionInput />
    </div>
  );
} 