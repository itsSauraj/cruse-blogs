import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@/utils/authUtils";
import { createUser, getUserByEmail } from "@/lib/db";

const AuthenticateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userData: UserTypes.UserAuth,
) => {
  const { email, password } = userData;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ email: "User not found" });
    }
    if (user.password !== hashPassword(password)) {
      return res.status(400).json({ password: "Invalid password" });
    }

    //TODO: NEXT AUTH - Implement NextAuth here
    return res.status(200).json({ name: user.name });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ email: "User not found" });
  }
};

const CreateUser = async (userData: UserTypes.SignUpUserAuth) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password1, password2, ...rest } = userData;

  const userForDB: UserTypes.User & MongooseDataBase.User = {
    ...rest,
    password: hashPassword(password1),
  };

  //TODO: DATABASE CALL OF NEXT AUTH - Implement NextAuth here
  const user = await createUser(userForDB);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return user["_doc"] as MongooseDataBase.User;
};

export { getUserByEmail, hashPassword, AuthenticateUser, CreateUser };
