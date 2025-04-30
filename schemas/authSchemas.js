import Joi from "joi";

export const registerLoginUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .message("Email: Please enter a valid email address")
    .required(),
  password: Joi.string()
    .min(3)
    .message("Password: Please enter at least 3 characters")
    .required(),
});

export const updateSubscriptionUserSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const emailUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .message("Email: Please enter a valid email address")
    .required(),
});
