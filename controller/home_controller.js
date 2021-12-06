const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/likes");
const customMWare = require("../config/middleware");

module.exports.home = async function (req, res, next) {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/users/sign-in");
    }
    let posts;
    let allUsers;
    if (req.user) {
      let userReq = await User.findById(req.user._id);
      let arrayOfUsers = userReq.following;
      console.log(arrayOfUsers);
      arrayOfUsers.unshift(req.user._id);
      console.log(arrayOfUsers);

      posts = await Post.find({ user: { $in: arrayOfUsers } })
        .sort("-createdAt")
        .populate("user")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            //how can we populate more fields of comment along with user ?
          },
        })
        .populate("likes");

      allUsers = await User.find({ _id: { $nin: arrayOfUsers } });
    }

    customMWare.setFlash(req, res, next);
    return res.render("home", {
      posts: posts,
      users: allUsers,
      title: "Home",
    });
  } catch (err) {
    console.log("error in loading home controller", err);
  }
};
