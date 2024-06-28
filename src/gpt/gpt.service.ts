import * as path from 'path';
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';

import {
  ImageGenerationDto,
  ImageVariationDto,
  OrthograpyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';

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

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      `../../generated/audios`,
      `${fileId}.mp3`,
    );

    const isFile = fs.existsSync(filePath);
    if (!isFile) {
      throw new NotFoundException(`File ${fileId} not found`);
    }

    return filePath;
  }

  async audioToText(audioFile: Express.Multer.File, prompt?: string) {
    return audioToTextUseCase(this.openai, { audioFile, prompt: prompt ?? '' });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return imageGenerationUseCase(this.openai, { ...imageGenerationDto });
  }

  async imageGenerationGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      `../../generated/images`,
      `${fileId}.png`,
    );

    const isFile = fs.existsSync(filePath);
    if (!isFile) {
      throw new NotFoundException(`File ${fileId} not found`);
    }

    return filePath;
  }

  async imageVariation({ baseImage }: ImageVariationDto) {
    return imageVariationUseCase(this.openai, { baseImage });
  }
}
