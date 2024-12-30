import { NextApiRequest, NextApiResponse } from "next";

import { UserExists, CreateUser } from "./userFunctions";

import { constructSignupErrors } from "@/utils/authUtils";
import { validateSignup } from "@/utils/valdator";

async function signUpApiFunction(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const validate = validateSignup(req.body);

    if (validate.error) {
      return res
        .status(400)
        .json({ ...constructSignupErrors(validate.error), data: req.body });
    }

    if (await UserExists(validate.value.email)) {
      return res
        .status(400)
        .json({ email: "Account with this email already exists" });
    }

    const user = await CreateUser(validate.value);

    return res.status(200).json(user);
  }

  res.setHeader("Allow", ["POST"]);

  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default signUpApiFunction;
