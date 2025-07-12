# 감정 코치 AI (Emotion Coach AI) 💚

---

## 📁 폴더/파일 구조 예시

```
emotion-coach-ai/
├── app/                     # Next.js 페이지 라우팅
│   ├── layout.tsx
│   ├── page.tsx             # 홈 페이지
│   ├── dashboard/
│   │   └── page.tsx         # 감정 요약 리포트
│   └── log/
│       └── page.tsx         # 감정 입력 UI 페이지
│
├── components/              # UI 컴포넌트
│   ├── EmotionSelector.tsx  # 이모지/감정 선택 컴포넌트
│   ├── TextInputCard.tsx    # 텍스트 입력창
│   ├── EmotionGraph.tsx     # 감정 변화 시각화 (Chart.js/Recharts)
│   └── WeeklySummaryCard.tsx# 요약 카드 UI
│
├── lib/                     # GPT API / 로직 처리
│   ├── openai.ts            # GPT API 호출 함수
│   ├── promptTemplate.ts    # 감정 요약용 프롬프트 템플릿
│   └── analyzeEmotion.ts    # 입력된 감정 분석 및 응답 생성 로직
│
├── data/                    # 감정 데이터 처리 (임시 또는 Firebase 연동)
│   └── dummyLogs.ts         # 예시용 감정 데이터 (초기)
│
├── styles/                  # Tailwind 또는 전용 CSS
│   └── globals.css
│
├── public/                  # 아이콘, 이미지 등 정적 파일
│   └── favicon.ico
│
├── .env.local               # API 키 저장용 (GPT API 등)
├── package.json
├── README.md                # 전체 프로젝트 목적 및 방향
└── prompt.md                # 서비스 기획 + GPT 프롬프트 기록
```

### 🗂️ 폴더/파일 구조 설계 의의

- **app/**  
  Next.js의 App Router 구조를 활용하여, 각 주요 기능(홈, 감정 입력, 대시보드 등)을 명확하게 분리합니다.

- **components/**  
  재사용 가능한 UI 컴포넌트(감정 선택, 입력창, 그래프, 요약 카드 등)를 모아, 유지보수성과 확장성을 높입니다.

- **lib/**  
  GPT API 연동, 프롬프트 템플릿, 감정 분석 등 핵심 비즈니스 로직을 분리하여, 서비스의 AI/로직 부분을 체계적으로 관리합니다.

- **data/**  
  감정 데이터의 임시 저장 또는 외부 DB(Firebase/Supabase) 연동을 위한 데이터 관리 공간입니다.

- **styles/**  
  TailwindCSS 또는 별도 CSS 파일을 관리합니다.

- **public/**  
  정적 파일(아이콘, 이미지 등)을 보관합니다.

- **.env.local**  
  API 키 등 민감 정보를 안전하게 관리합니다.

- **prompt.md**  
  서비스 기획, AI 프롬프트, 대화 예시 등 기획/AI 관련 문서를 별도로 관리합니다.

---

# 감정 코치 AI (Emotion Coach AI) 💚

현대인의 감정 소진과 정신적 피로를 해결하는 감정 트래킹 기반 퍼스널 코칭 모바일웹 서비스입니다.

## 🎯 서비스 개요

현대인은 정신적 피로와 감정 소진을 겪지만, 이를 표현하고 정리할 기회가 적고, 전문가 상담도 지속적으로 받기 어렵습니다.  
이 프로젝트는 **'감정 기록을 통한 자기이해'**를 핵심 목표로 하는 감정 트래킹 기반 퍼스널 코칭 모바일웹 서비스입니다.

## 🔍 서비스 목표

- 나의 감정을 인식하고 표현하는 연습을 돕는다
- 감정 변화의 패턴을 이해하게 한다
- 감정 데이터 기반 AI 코멘트로 자기이해와 성장을 유도한다

## 🌱 사용자 페르소나

- **30~40대 직장인 / 부모 / 창작자**
- 자기성찰, 자기관리, 멘탈케어에 관심 있는 사용자
- 감정을 말로 표현하거나 기록하는데 익숙하지 않지만, 스스로 이해하고 싶은 사람

## 🧩 주요 기능

### 1. 감정 입력 UI
- 하루 2~3회 시간대별 감정 기록 유도 (아침/점심/저녁)
- 감정은 이모지 또는 1~10 스케일 + 간단한 메모 (텍스트)
- 대표 감정 선택 옵션 (예: 불안/기쁨/분노/무기력/감사 등)

### 2. 감정 리포트
- 주간/월간 감정 그래프 시각화 (시간별 추이, 긍정/부정 비율)
- 사용자가 자주 선택한 감정 랭킹, 가장 감정 변화가 큰 날 등

### 3. AI 코멘트 (GPT 기반)
- 오늘의 감정 요약 및 GPT가 코칭 코멘트 제공
- 예시: "이번 주는 무기력을 자주 느꼈어요. 혹시 일상 속에서 에너지를 빼앗는 루틴이 있었을까요?"

### 4. 감정 탐색 피드백
- 사용자의 감정 메모를 분석해 "감정을 유발한 상황" 요약 제공
- 반복되는 키워드(예: 회의, 야근, 아이, 비효율) 자동 추출

### 5. 자기이해 퀘스트
- 일주일에 1회, GPT가 감정 기반 자기이해 질문을 제시
- 예: "무기력을 자주 느낀 지난주, 나에게 필요한 변화는 무엇일까요?"

## 🛠 기술 스택

### Frontend
- **Next.js 14** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안정성
- **TailwindCSS** - 스타일링
- **React Query** - 서버 상태 관리
- **Chart.js / Recharts** - 감정 그래프 시각화

### Backend & Database
- **Firebase / Supabase** - 백엔드 서비스 및 데이터베이스
- **Next.js API Routes** - 서버 API

### AI & External Services
- **OpenAI GPT-4 API** - 텍스트 요약, 코멘트 생성
- **Vercel** - 배포 플랫폼

## 🎯 향후 확장 아이디어

- 감정 코칭 히스토리 저장 및 AI 맞춤형 루틴 추천
- 감정 변화 예측 모델링
- 유사 감정 상태 사용자 커뮤니티 연결 (옵션형)
- 감정 추천 음악/루틴
- Notion 연동

## 🧠 AI 프롬프트 예시

### 오늘의 감정 요약 코멘트 생성용
```
다음은 사용자의 감정 입력 기록입니다. 이 데이터를 바탕으로 사용자가 이번 하루 또는 일주일 동안 어떤 감정 경향을 보였는지 요약해주고, 부드러운 코칭 멘트를 2~3문장으로 제공해줘.

[입력 예시]
- 아침: 😐 보통 – "출근 전인데 머리가 복잡하다."
- 점심: 😫 피곤 – "일이 많고 회의가 계속됐다."
- 저녁: 🙂 평온 – "아이와 산책하며 마음이 조금 나아졌다."
```

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 📱 모바일 최적화

- 반응형 디자인으로 모바일 우선 접근
- 터치 친화적 UI/UX
- PWA 지원으로 앱과 같은 경험 제공

## 🔐 환경 변수

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Firebase/Supabase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

---

**감정을 기록하고, 이해하고, 성장하세요** 🌱
