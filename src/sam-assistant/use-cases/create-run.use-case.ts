import { OpenAI } from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_2J0nZJokwUPQsA6wrRCeAWtb' } = options;

  const run = openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  return run;
};
