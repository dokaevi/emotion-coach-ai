export interface EmotionCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  subEmotions: SubEmotion[];
}

export interface SubEmotion {
  id: string;
  name: string;
  description: string;
  question: string;
}

export interface EmotionLog {
  id: string;
  date: string;
  mainEmotion: string;
  subEmotion: string;
  text: string;
  score: number;
  timestamp: number;
}

export const EMOTION_CATEGORIES: EmotionCategory[] = [
  {
    id: 'joy',
    name: '기쁨',
    emoji: '😊',
    color: '#FFD700',
    subEmotions: [
      { id: 'proud', name: '뿌듯함', description: '성취감을 느끼는 기쁨', question: '무엇을 이루어서 뿌듯했나요?' },
      { id: 'grateful', name: '감사함', description: '고마움을 느끼는 기쁨', question: '누구에게 또는 무엇에 감사했나요?' },
      { id: 'excited', name: '설렘', description: '기대감으로 가득한 기쁨', question: '무엇이 당신을 설레게 했나요?' },
      { id: 'content', name: '만족함', description: '충분히 행복한 기쁨', question: '무엇이 당신을 만족시켰나요?' }
    ]
  },
  {
    id: 'sadness',
    name: '슬픔',
    emoji: '😢',
    color: '#87CEEB',
    subEmotions: [
      { id: 'lonely', name: '외로움', description: '홀로 남겨진 슬픔', question: '왜 외로움을 느꼈나요?' },
      { id: 'disappointed', name: '실망', description: '기대에 미치지 못한 슬픔', question: '무엇이 당신을 실망시켰나요?' },
      { id: 'melancholy', name: '우울함', description: '깊은 슬픔', question: '무엇이 당신을 우울하게 했나요?' },
      { id: 'nostalgic', name: '그리움', description: '과거를 그리는 슬픔', question: '무엇이 그리워졌나요?' }
    ]
  },
  {
    id: 'anger',
    name: '분노',
    emoji: '😠',
    color: '#FF6B6B',
    subEmotions: [
      { id: 'frustrated', name: '답답함', description: '해결되지 않는 분노', question: '무엇이 당신을 답답하게 했나요?' },
      { id: 'irritated', name: '짜증', description: '사소한 일에 느끼는 분노', question: '무엇이 당신을 짜증나게 했나요?' },
      { id: 'furious', name: '격분', description: '강한 분노', question: '무엇이 당신을 격분시켰나요?' },
      { id: 'resentful', name: '원망', description: '누군가에 대한 분노', question: '누구에 대한 원망인가요?' }
    ]
  },
  {
    id: 'anxiety',
    name: '불안',
    emoji: '😰',
    color: '#FFA500',
    subEmotions: [
      { id: 'worried', name: '걱정', description: '미래에 대한 불안', question: '무엇이 당신을 걱정하게 했나요?' },
      { id: 'nervous', name: '긴장', description: '앞으로의 일에 대한 불안', question: '무엇이 당신을 긴장시켰나요?' },
      { id: 'overwhelmed', name: '압도됨', description: '너무 많은 일로 인한 불안', question: '무엇이 당신을 압도했나요?' },
      { id: 'uncertain', name: '불확실함', description: '앞일을 모르는 불안', question: '무엇이 불확실한가요?' }
    ]
  },
  {
    id: 'tired',
    name: '피로',
    emoji: '😴',
    color: '#8B4513',
    subEmotions: [
      { id: 'exhausted', name: '지침', description: '완전히 소진된 피로', question: '무엇이 당신을 지치게 했나요?' },
      { id: 'drained', name: '탈진', description: '에너지가 빠진 피로', question: '무엇이 당신의 에너지를 빼앗았나요?' },
      { id: 'sleepy', name: '졸림', description: '잠이 오는 피로', question: '왜 졸린가요?' },
      { id: 'burned_out', name: '번아웃', description: '오랫동안 쌓인 피로', question: '언제부터 이런 피로를 느꼈나요?' }
    ]
  },
  {
    id: 'calm',
    name: '안정',
    emoji: '😌',
    color: '#90EE90',
    subEmotions: [
      { id: 'peaceful', name: '평온함', description: '마음이 고요한 안정', question: '무엇이 당신을 평온하게 했나요?' },
      { id: 'relaxed', name: '편안함', description: '긴장이 풀린 안정', question: '무엇이 당신을 편안하게 했나요?' },
      { id: 'balanced', name: '균형잡힘', description: '조화로운 안정', question: '무엇이 당신의 균형을 맞춰줬나요?' },
      { id: 'centered', name: '집중됨', description: '현재에 집중된 안정', question: '무엇에 집중하고 있나요?' }
    ]
  }
]; 