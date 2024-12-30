import { NextApiRequest, NextApiResponse } from "next";

import { createUser, getUserByEmail } from "@/lib/db";

export const AuthenticateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userData: UserTypes.UserAuth,
) => {
  const { email, password } = userData;
  const context: Record<string, Record<string, string | number> | number> = {};

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ email: "User not found" });
    }

    if (!user.verified) {
      return res.status(400).json({ email: "User not verified" });
    }

    if (!(await user.correctPassword(password, user.password))) {
      context.status = 400;
      context.response = { password: "Invalid credentials" };
    }

    if (context.status) {
      return res.status(context.status as number).json(context.response);
    }

    //TODO: NEXT AUTH - Implement NextAuth here
    return res.status(200).json({ name: user.name });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ email: "Some thing went wrong" });
  }
};

export const UserExists = async (email: string) => {
  const user = await getUserByEmail(email);

  return user;
};

export const CreateUser = async (userData: UserTypes.SignUpUserAuth) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password1, password2, ...rest } = userData;

  const userForDB: any = {
    ...rest,
    password: password1,
  };

  //TODO: DATABASE CALL OF NEXT AUTH - Implement NextAuth here
  const user = await createUser(userForDB);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, created_at, deleted_at, updated_at, __v, ...restCreated } =
    user.toObject() as any;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return { ...restCreated } as MongooseDataBase.User;
};
