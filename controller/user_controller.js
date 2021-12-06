const User = require("../models/user");
const Post = require("../models/post");
const customMWare = require("../config/middleware");

module.exports.profile = async function (req, res) {
  try {
    let user_req = await User.findById(req.params.id);
    let post = await Post.find({ user: user_req._id })
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let viewer = await User.findById(req.user.id);

    let is_user_reqInFollowing = await viewer.following.find(
      (u) => u == req.params.id
    );
    console.log(is_user_reqInFollowing);
    let userInFollowing = false;
    if (is_user_reqInFollowing) {
      console.log("working");
      userInFollowing = true;
    }
    console.log(userInFollowing);

    customMWare.setFlash(req, res, next);

    return res.render("profile", {
      user_visited: user_req,
      posts: post,
      following: userInFollowing,
      title: user_req.name,
    });
  } catch (err) {
    console.log("error in loading profile controller", err);
  }
};

module.exports.Sign_up = function (req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
    }
    customMWare.setFlash(req, res, next);
    return res.render("sign_up", {
      title: "Sign Up",
    });
  } catch (err) {
    console.log("error in loading Sign Up controller", err);
  }
};

module.exports.Sign_In = function (req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
    }
    customMWare.setFlash(req, res, next);
    return res.render("sign_in", {
      title: "Sign In",
    });
  } catch (err) {
    console.log("error in loading Sign In controller", err);
  }
};

//for creating new user
module.exports.create = function (req, res) {
  try {
    if (req.body.password != req.body.conformPassword) {
      req.flash("error", "Password and confirm password doesnt match");
      return res.redirect("/users/sign-up");
    }

    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        console.log(
          "error in finding user in create method of user controller",
          err
        );
        return;
      }

      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            console.log(
              "error in finding user in create method of user controller",
              err
            );
            return;
          }
        });
        req.flash(
          "success",
          "User Created Successfully, Sign In from Sign In page"
        );
        return res.redirect("/users/sign-up");
      } else {
        req.flash(
          "success",
          `User with email: ${req.body.email} already exist.`
        );
        return res.redirect("/users/sign-up");
      }
    });
  } catch (err) {
    console.log("error in loading create method in user controller", err);
    return res.redirect("back");
  }
};

//creating session for user which is signing in
module.exports.createSession = function (req, res) {
  try {
    //it is authenticated via passport when route is being processed in user.js in routes
    return res.redirect("/");
  } catch (err) {
    console.log(
      "error in loading createSession method of user controller",
      err
    );

    return res.redirect("back");
  }
};

// logging out the user or destroying its session
module.exports.destroySession = function (req, res) {
  try {
    req.logout(); // method by passport
    req.flash("success", "Logged out successfully");
    return res.redirect("/");
  } catch (err) {
    console.log("error in loading destroySession controller", err);
    return res.redirect("back");
  }
};

//updating avatar of user
module.exports.update = async function (req, res) {
  if (req.user.id) {
    // you should keep a check if user req to change profile is the user whose profile is logged in
    try {
      //console.log(req.body);
      //console.log(req); // we arent getting body of rq here but we are getting at next console ??

      let user = await User.findById(req.user.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("error in upladedAvatar of user", err);
          return err;
        }
        //console.log(req.body);
        //user.name = req.body.name;
        //user.email = req.body.email;
        if (req.body.content) {
          user.about = req.body.content;
        }
        if (req.file) {
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        console.log(user.avatar);
        req.flash("success", "Profile picture updated");
        return res.redirect("back");
      });

      req.flash("success", "Profile is not updated");
      return res.redirect("back");
    } catch (err) {
      console.log("error in update method of user controller of user", err);
      return res.redirect("back");
    }
  } else {
    console.log("unauthorized");
    return res.status(401).send("unauthorized");
  }
};

module.exports.addFollower = async function (req, res) {
  try {
    let user = await User.findOne({ _id: req.body.id }); // access the followers list of person you want to follow

    let followerExist = await user.followers.find(function (user) {
      if (user == req.user._id) {
        return user;
      } else {
        return false;
      }
    });
    console.log(followerExist);

    // if user who want to follow is not in the followers list then add
    if (followerExist) {
    } else {
      user.followers.push(req.user._id);
      user.save();
    }

    // now check if to be followed user exists in req users following list
    let userReq = await User.findOne({ _id: req.user._id });

    let followingExist = userReq.following.find(function (user) {
      if (user == req.body.id) {
        return user;
      } else {
        return false;
      }
    });

    if (followingExist) {
    } else {
      userReq.following.push(req.body.id);
      userReq.save();
    }

    if (req.xhr) {
      return res.status(200).json({
        message: "friend added",
      });
    }
  } catch (err) {
    console.log("error in addFriend method of user controller", err);
  }
};

module.exports.removeFollower = async function (req, res) {
  try {
    console.log(req.params);
    let req_user = await User.findById({ _id: req.user.id });

    let isExist = await req_user.following.find((u) => u == req.params.id);
    if (isExist) {
      req_user.following.pull(req.params.id);
      req_user.save();

      let user_unfollowed = await User.findById({ _id: req.params.id });
      user_unfollowed.followers.pull(req.user.id);
      user_unfollowed.save();
    }

    return res.redirect("back");
  } catch (err) {
    console.log("error in remove follower method of user controller", err);
  }
};
