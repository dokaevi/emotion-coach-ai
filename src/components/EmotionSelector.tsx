'use client';

import { useState } from 'react';
import { EMOTION_CATEGORIES, EmotionCategory, SubEmotion } from '@/types/emotion';

interface EmotionSelectorProps {
  onEmotionSelect: (mainEmotion: string, subEmotion: string, question: string) => void;
}

export default function EmotionSelector({ onEmotionSelect }: EmotionSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<EmotionCategory | null>(null);
  const [showSubEmotions, setShowSubEmotions] = useState(false);

  const handleCategorySelect = (category: EmotionCategory) => {
    setSelectedCategory(category);
    setShowSubEmotions(true);
  };

  const handleSubEmotionSelect = (subEmotion: SubEmotion) => {
    if (selectedCategory) {
      onEmotionSelect(selectedCategory.name, subEmotion.name, subEmotion.question);
      setSelectedCategory(null);
      setShowSubEmotions(false);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setShowSubEmotions(false);
  };

  if (showSubEmotions && selectedCategory) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedCategory.emoji}</span>
            <span className="text-lg font-semibold">{selectedCategory.name}</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          좀 더 구체적으로 말해볼까요?
        </div>
        <div className="grid grid-cols-2 gap-3">
          {selectedCategory.subEmotions.map((subEmotion) => (
            <button
              key={subEmotion.id}
              onClick={() => handleSubEmotionSelect(subEmotion)}
              className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
            >
              <div className="font-medium text-gray-900 mb-1">{subEmotion.name}</div>
              <div className="text-xs text-gray-600">{subEmotion.description}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 안내문구 한 줄만 상단에 */}
      <div className="text-left text-base font-semibold mb-3 pl-2">
        오늘의 감정을 선택해 기록해보세요
      </div>
      {/* 감정 카드 2줄 3개씩 */}
      <div className="grid grid-cols-3 gap-3 px-2 mb-2">
        {EMOTION_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
            style={{ borderColor: category.color + '40' }}
          >
            <span className="text-3xl mb-1">{category.emoji}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 