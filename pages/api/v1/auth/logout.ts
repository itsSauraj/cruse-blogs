import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

const SignOutUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const router = useRouter();

  if (req.method !== "POST") {
    router.push("/");
    res.status(200).end();
  }

  res.setHeader("Allow", ["POST"]);

  return res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default SignOutUser;
