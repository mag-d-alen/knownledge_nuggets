export class AIVerificationService {
  async verifyNugget(title: string, content: string): Promise<string> {
    const prompt = `Please act as a helpful assistant that reviews the following knowledge entry and provide constructive feedback:

Title: ${title}
Content: ${content}
Please provide:
1. A brief summary of what the entry is about
2. Any suggestions for improvement (clarity, completeness, accuracy)
3. Suggest a refined version, examples of use
4. Return the response in markdown format
5. Keep the response concise and helpful.`;
    return this.sendRequestToAI(prompt);
  }

  async explainNugget(
    title: string,
    content: string,
    question: string
  ): Promise<string> {
    const prompt = `Please act as a helpful assistant that explains the following knowledge entry and provide a detailed explanation:

Title: ${title}
Content: ${content}
Question: ${question} 
1 .Please address the question taking as context the knowledge entry. 
2. Provide a detailed explanation of the answer.
3. Return the response in markdown format
4. Keep the response concise and helpful.`;
    return this.sendRequestToAI(prompt);
  }

  private async sendRequestToAI(prompt: string): Promise<string> {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY;
      let response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'x-ai/grok-4.1-fast:free',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            reasoning: { enabled: true },
          }),
        }
      );
      const result = await response.json();
      response = result.choices[0].message;
      return result.choices[0].message.content;
    } catch (error) {
      console.error('AI verification error:', error);
      return this.getFallbackResponse();
    }
  }

  private getFallbackResponse(): string {
    return `The AI assistant has failed to verify your knowledge nugget. 
    You may want to try again later.
    But then, AI assistant might not like you very much.
    Have you offered him a cup of coffee?  
    Anyways, you can save your knowledge nugget anyway.
    Have a nice day!
`;
  }
}
