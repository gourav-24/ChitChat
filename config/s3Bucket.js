require("dotenv").config();
const AWS = require("aws-sdk");
//const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

AWS.config.update({
  accessKeyId: "AKIA3NVUKTWGEBS2LJUV",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const bucketName = "chitchatpictures";
module.exports.upload = function (file) {
  try {
    let s3 = new AWS.S3();
    const fileStream = fs.createReadStream(file.path);
    const uploadParam = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };

    return s3.upload(uploadParam).promise();
  } catch (err) {
    return console.error(err);
  }
};

// download a file to s3

module.exports.download = function (fileKey) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };
    let s3 = new AWS.S3();
    return s3.getObject(downloadParams).createReadStream();
  } catch (err) {
    return console.error(err);
  }
};
