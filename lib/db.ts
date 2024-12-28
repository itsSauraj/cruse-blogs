import mongoose from "mongoose";

import UserModel from "@/models/user";

const mongoUserNname = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDBName = process.env.MONGO_DB_NAME;

const connectionString = `mongodb+srv://${mongoUserNname}:${mongoPassword}@cruse.1rrd7.mongodb.net/${mongoDBName}?retryWrites=true&w=majority&appName=cruse`;

export const connectToDatabse = async () => {
  return await mongoose.connect(connectionString);
};

export const createUser = async (data: MongooseDataBase.User) => {
  const client = await connectToDatabse();
  const user = new UserModel(data);

  await user.save();
  client.disconnect();

  return user;
};

export const getUserByEmail = async (email: string) => {
  const client = await connectToDatabse();
  const user = await UserModel.findOne({ email });

  client.disconnect();

  console.log(user);

  return user;
};
