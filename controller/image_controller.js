const s3 = require("../config/s3Bucket");

module.exports.fetch = function (req, res) {
  try {
    let key = req.params.key;
    let readStream = s3.download(key);
    return readStream.pipe(res);
  } catch (err) {
    console.log("Error in image download controller: ", err);
  }
};
