import s3 from '../config/aws';

const uploadToS3 = async (data: Buffer, fileName: string, mimetype: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: data,
    ContentType: mimetype,
    ContentDisposition: 'inline',
    ACL: 'public-read',
  };
  return s3.upload(params).promise();
};

const handleFileData = async function (
  buffer: Buffer,
  fileName: string,
  mimetype: string,
) {
  const data = buffer;
  return uploadToS3(data, fileName, mimetype);
};

export { handleFileData };
