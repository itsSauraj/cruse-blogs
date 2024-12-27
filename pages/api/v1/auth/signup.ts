import { NextApiRequest, NextApiResponse } from "next";

import { constructSignupErrors } from "./utils";
import { CreateUser } from "./userFunctions";

import { validateSignup } from "@/utils/valdator";

async function signUpApiFunction(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const validate = validateSignup(req.body);

    if (validate.error) {
      return res
        .status(400)
        .json({ ...constructSignupErrors(validate.error), data: req.body });
    }
    const user = await CreateUser(validate.value);

    return res.status(200).json({ name: "John Doe" });
  }

  res.setHeader("Allow", ["POST"]);

  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default signUpApiFunction;
