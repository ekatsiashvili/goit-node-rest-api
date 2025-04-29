import HttpError from "../helpers/HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return next(HttpError(400, message));
    }

    next(); // тільки якщо помилки немає
  };

  return func;
};

export default validateBody;
