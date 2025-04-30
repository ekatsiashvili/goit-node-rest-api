import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import { findUser } from "../services/authService.js";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer missing"));
  }

  const { data, error } = verifyToken(token);

  if (error) {
    return next(HttpError(401, error.message));
  }

  const user = await findUser({ email: data.email });

  if (!user) {
    return next(HttpError(401, "User not found"));
  }

  if (token !== user.token) {
    return next(HttpError(401));
  }

  req.user = user;

  next();
};

export default auth;
