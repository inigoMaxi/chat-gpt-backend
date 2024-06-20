import { translateUseCase } from './use-cases/translate.use-case';
import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
} from './use-cases';
import { OrthograpyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
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
  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }
  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }
  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }
}
