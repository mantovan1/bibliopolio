require('dotenv').config()
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({ region: 'us-east-1' });

module.exports = s3;
