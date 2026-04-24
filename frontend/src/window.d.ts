interface Window {
    ai: {
      assistant: {
        capabilities: () => Promise<{ available: "readily" | "after-download" | "no" }>;
        create: (options?: { systemPrompt?: string }) => Promise<AIAssistant>;
      };
    };
  }
  
  interface AIAssistant {
    prompt: (text: string) => Promise<string>;
    promptStreaming: (text: string) => AsyncIterable<string>;
    destroy: () => void;
  }