import fs from 'fs';
import { resolve } from 'path';

const dir = (fileDir: string) =>
  resolve(__dirname, '..', '..', 'uploads', fileDir);

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(dir(filename));
  } catch {
    return;
  }

  await fs.promises.unlink(dir(filename));
};
