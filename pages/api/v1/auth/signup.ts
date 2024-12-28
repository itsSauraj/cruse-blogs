import { NextApiRequest, NextApiResponse } from "next";

import { CreateUser } from "./userFunctions";

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
    const user = await CreateUser(validate.value);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, deleted_at, updated_at, __v, ...rest } =
      user as any;

    return res.status(200).json({ ...rest });
  }

  res.setHeader("Allow", ["POST"]);

  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default signUpApiFunction;
