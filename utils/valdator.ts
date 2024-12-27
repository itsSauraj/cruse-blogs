import Joi from "joi";
export const nameSchema = Joi.string().min(3).max(30).required();
export const emailSchema = Joi.string().email().required();
export const passwordSchema = Joi.string()
  .min(8)
  .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
  .required();

const signupSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password1: passwordSchema,
  password2: Joi.any().valid(Joi.ref("password1")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

const signinSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const validateSignup = (data: UserTypes.User) =>
  signupSchema.validate(data);
export const validateSignin = (data: UserTypes.UserAuth) =>
  signinSchema.validate(data);
