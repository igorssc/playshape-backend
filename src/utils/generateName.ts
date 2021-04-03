import crypto from 'crypto';

const generateName = (originalName?: string) => {
  const fileHash = crypto.randomBytes(16).toString('hex');
  let fileName = fileHash;

  if (originalName) {
    fileName = fileName + '-' + originalName;
  }

  fileName.replace(/=/g, '').replace(/\//g, '-').replace(/\+/, '_');

  return fileName;
};

export default generateName;
