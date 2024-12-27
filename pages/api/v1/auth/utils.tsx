import Joi from "joi";

const constructErrors = (
  errors: Joi.ValidationError,
  fields: Record<string, string>,
): Record<string, string> => {
  const errorObject: Record<string, string> = {};

  errors.details.forEach((error) => {
    for (const field in fields) {
      if (error.message.includes(field)) {
        let errorMessage = `Please enter a valid ${field}`;

        if (error.message.includes("pattern")) {
          errorMessage = fields[field];
        }

        errorObject[field] = errorMessage;
      }
    }
  });

  if (errors.details[0].message.includes("Passwords do not match")) {
    errorObject.password2 = "Passwords do not match";
    errorObject.password1 = "Passwords do not match";
  }

  return errorObject;
};

const constructLoginErrors = (
  errors: Joi.ValidationError,
): Record<string, string> => {
  const fields = {
    email: "Email must be a valid email",
    password:
      "Password must contain at least one letter, one number and one special character",
  };

  return constructErrors(errors, fields);
};

const constructSignupErrors = (
  errors: Joi.ValidationError,
): Record<string, string> => {
  const fields = {
    name: "Name must contain only alphabets",
    email: "Email must be a valid email",
    password1:
      "Password must contain at least one letter, one number and one special character",
    password2:
      "Password must contain at least one letter, one number and one special character",
  };

  return constructErrors(errors, fields);
};

export { constructLoginErrors, constructSignupErrors };
