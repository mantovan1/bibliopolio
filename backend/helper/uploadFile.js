const s3 = require('./s3Config.js');
const fs = require('fs');

const uploadFile = async(file) => {

    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: 'bibliopolio',
        Body: fileStream,
        Key: file.originalname?file.originalname:file.name,
    }

    return s3.upload(uploadParams).promise();
}

module.exports = uploadFile;