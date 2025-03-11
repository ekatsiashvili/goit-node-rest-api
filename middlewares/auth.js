import passport from "passport";
import HttpError from "../helpers/HttpError.js";

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    // get token
    const requestToken = req.headers.authorization?.split(" ")[1] || "";

    // return 401 if an error of auth
    if (!user || err || user.token !== requestToken) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
