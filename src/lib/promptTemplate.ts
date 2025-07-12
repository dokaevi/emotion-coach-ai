export function getEmotionSummaryPrompt(logs: { time: string; emoji: string; emotion: string; memo: string }[]) {
  const formatted = logs.map(
    (log) => `- ${log.time}: ${log.emoji} ${log.emotion} – '${log.memo}'`
  ).join('\n');
  return `다음은 사용자의 감정 입력 기록입니다. 이 데이터를 바탕으로 사용자가 이번 하루 동안 어떤 감정 경향을 보였는지 요약해주고, 부드러운 코칭 멘트를 2~3문장으로 제공해줘.\n\n[입력]\n${formatted}`;
} 