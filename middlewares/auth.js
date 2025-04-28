import passport from "passport";
import HttpError from "../helpers/HttpError.js";

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    // Get token from header of the request
    const requestToken = req.headers.authorization?.split(" ")[1] || "";

    // return 401 in case of any issue happens:
    // 1. error
    // 2. user not found
    // 3. request token doesn't match the user's db token
    if (!user || err || user.token !== requestToken) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
