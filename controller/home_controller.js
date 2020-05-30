const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/likes");

module.exports.home = async function (req, res) {
  try {
    let posts;
    let allUsers;
    if (req.user) {
      let UserReq = User.find({ _id: req.user._id });
      let arrayOfUsers = [req.user._id];
      arrayOfUsers.unshift(UserReq.following);

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
      let u = await User.find({});
      console.log("---", u);

      allUsers = await User.find({ _id: { $nin: arrayOfUsers } });
      console.log(allUsers);
    }

    return res.render("home", {
      posts: posts,
      users: allUsers,
      title: "Home",
    });
  } catch (err) {
    console.log("error in loading home controller");
  }
};
