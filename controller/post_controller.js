const Post = require("../models/post");
const Like = require("../models/likes");
const Comment = require("../models/comment");
const S3Bucket = require("../config/s3Bucket");

// creating post
module.exports.create = async function (req, res) {
  try {
    await Post.uploadedImage(req, res, async function (err) {
      if (err) {
        console.log("error in uploading imag/Pdf of posts", err);
        return;
      }

      let uploadedImg = await S3Bucket.upload(req.file);

      await Post.create({
        content: req.body.content,
        user: req.user._id,
        picture: "/image/" + uploadedImg.key,
      });
    });

    // let uploadedImg = await S3Bucket.upload(req.file);
    // if (uploadedImg.key) {
    //   await Post.create({
    //     content: req.body.content,
    //     user: req.user._id,
    //     picture: "/image/" + uploadedImg.key,
    //   });
    // }

    req.flash("success", "Post created");

    return res.redirect("back");
  } catch (err) {
    console.log("error in loading create method of post_controller", err);
    return res.redirect("back");
  }
};

// destroying post
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post deleted");
      return res.redirect("back");
    }

    req.flash("error", "Post is not deleted");
    return res.redirect("back");
  } catch (err) {
    console.log("error in loading destroy method of post_controller", err);
    return res.redirect("back");
  }
};

module.exports.find = function (req, res) {
  try {
    console.log(req.query);

    if (req.xhr) {
      res.status(200).json({
        message: "message",
      });
    }
  } catch (err) {
    console.log("error in find method of post Controller", err);
  }
};
