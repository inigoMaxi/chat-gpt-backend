import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { InternalServerErrorException } from '@nestjs/common';

export const downloadImageAsPng = async (
  url: string,
  fullPath: boolean = false,
) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new InternalServerErrorException('Failed to download image');
  }
  const folderPath = path.resolve('./', `./generated/images`);
  fs.mkdirSync(folderPath, { recursive: true });
  const imageName = `${new Date().getTime()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());
  //fs.writeFileSync(`${folderPath}/${imageName}`, buffer);
  const completePath = path.join(folderPath, imageName);
  await sharp(buffer).png().ensureAlpha().toFile(completePath);
  return fullPath ? completePath : imageName;
};
