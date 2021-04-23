import { s3 } from '../config/aws';

let deleteToS3 = async (fileName: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };
  return s3.deleteObject(params).promise();
};

const deleteFile = async (fileName: string) => {
  try {
    await deleteToS3(fileName);
  } catch (err) {
    throw err;
  }

  return true;
};

export { deleteFile };
