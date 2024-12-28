import { NextApiRequest, NextApiResponse } from "next";

import { AuthenticateUser } from "./userFunctions";

import { constructLoginErrors } from "@/utils/authUtils";
import { validateSignin } from "@/utils/valdator";

async function signInApiFunction(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const validate = validateSignin(req.body);

    if (validate.error) {
      return res.status(400).json({ ...constructLoginErrors(validate.error) });
    }

    try {
      await AuthenticateUser(req, res, validate.value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).json({
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    }
  }

  res.setHeader("Allow", ["POST"]);

  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default signInApiFunction;
