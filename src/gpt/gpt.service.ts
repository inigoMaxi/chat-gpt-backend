import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthograpyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  async ortographyCheck(orthograpyDto: OrthograpyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthograpyDto.prompt,
    });
  }
}
