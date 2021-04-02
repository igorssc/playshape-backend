import as from 'awaitify-stream';

import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

let uploadToS3 = async (data: Buffer, filename: string, mimetype: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: data,
    ContentType: mimetype,
    ContentDisposition: 'inline',
    ACL: 'public-read',
  };
  return s3.upload(params).promise();
};

let handleFileData = async function (
  buffer: Array<any>,
  filename: string,
  mimetype: string,
) {
  let data = Buffer.concat(buffer);
  return uploadToS3(data, filename, mimetype);
};

const uploadFile = async (file) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  let buffer: Array<any> = [];
  let reader = as.createReader(createReadStream());
  let chunk;
  while (null !== (chunk = await reader.readAsync())) {
    buffer.push(chunk);
  }

  let url: string;
  try {
    let res = await handleFileData(buffer, filename, mimetype);
    url = res.Location;
    console.log(
      `File uploaded successfully at ${url}, size: ${length / 1000} kb`,
    );
  } catch (err) {
    throw err;
  }

  return { filename, mimetype, encoding, url };
};

export { uploadFile };
