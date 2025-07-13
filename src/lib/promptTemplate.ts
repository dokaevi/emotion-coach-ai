export function getEmotionSummaryPrompt(logs: { date: string; mainEmotion: string; subEmotion: string; text: string; score: number }[]) {
  const formatted = logs.map(
    (log) => `- ${log.date}: ${log.mainEmotion} (${log.subEmotion}) - 점수: ${log.score}/10 - '${log.text}'`
  ).join('\n');
  return `다음은 사용자의 감정 입력 기록입니다. 이 데이터를 바탕으로 사용자가 이번 하루 동안 어떤 감정 경향을 보였는지 요약해주고, 부드러운 코칭 멘트를 2~3문장으로 제공해줘.\n\n[입력]\n${formatted}`;
} 