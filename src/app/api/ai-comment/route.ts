import { NextRequest, NextResponse } from 'next/server';
import { getAIComment } from '@/lib/openai';
import { getEmotionSummaryPrompt } from '@/lib/promptTemplate';

export async function POST(req: NextRequest) {
  try {
    const { logs } = await req.json();
    // logs: [{ time, emoji, emotion, memo }]
    const prompt = getEmotionSummaryPrompt(logs);
    const messages: { role: 'system' | 'user'; content: string }[] = [
      { role: 'system', content: '너는 감정 코칭 전문가야.' },
      { role: 'user', content: prompt },
    ];
    const aiComment = await getAIComment(messages);
    return NextResponse.json({ comment: aiComment });
  } catch (e) {
    return NextResponse.json({ error: 'AI 코멘트 생성 실패', detail: String(e) }, { status: 500 });
  }
} 