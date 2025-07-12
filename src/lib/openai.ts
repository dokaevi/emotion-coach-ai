export async function getAIComment(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 300,
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
} 