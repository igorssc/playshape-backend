import sharp from 'sharp';

interface ICompressPicture {
  path: string;
  filename: string;
  mimetype: string;
  buffer: Buffer;
}

export default async (
  path: string,
  filename: string,
  size: number,
): Promise<ICompressPicture> => {
  const mimetype = 'webp';

  const newPath = path.split('.')[0] + '.' + mimetype;
  const newName = filename.split('.')[0] + '.' + mimetype;

  const data = await sharp(path)
    .resize(size)
    .toFormat(mimetype)
    .webp({
      quality: 50,
    })
    .toBuffer();

  return { path: newPath, filename: newName, mimetype, buffer: data };
};
