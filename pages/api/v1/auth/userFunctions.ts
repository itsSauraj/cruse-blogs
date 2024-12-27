import crypto, { UUID } from "crypto";

import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

import { ReadUsersFromFile, WriteUserToFile } from "./fileFunciton";

const getAllUsers = async () => {
  // Read users from database instead of file
  return await ReadUsersFromFile();
};

const getUserByEmail = async (email: string) => {
  const users = await getAllUsers();

  return users.find((user) => user.email === email);
};

const getUserById = async (id: string) => {
  const users = await getAllUsers();

  return users.find((user) => user.id === id);
};

const hashPassword = (password: string) => {
  const secretKey = process.env.AUTH_SECRET as any;

  const hash = crypto
    .pbkdf2Sync(password, secretKey, 1000, 64, `sha512`)
    .toString(`hex`);

  return `dcr_${hash}`;
};

//TODO: NEXT AUTH - Implement NextAuth here
const AddUserTOFile = async (user: UserTypes.DBUser) => {
  await WriteUserToFile(user);
};

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

  const userForDB: UserTypes.DBUser = {
    ...rest,
    created_at: new Date().toISOString(),
    id: uuidv4() as UUID,
    password: hashPassword(password1),
  };

  //TODO: DATABASE CALL OF NEXT AUTH - Implement NextAuth here
  await AddUserTOFile(userForDB);

  return userForDB;
};

export {
  getUserByEmail,
  getUserById,
  hashPassword,
  AuthenticateUser,
  CreateUser,
};
