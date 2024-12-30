import mongoose from "mongoose";
import bcrypt from "bcrypt";

import baseModal from "./baseModel";

import { hashPassword } from "@/utils/authUtils";

const UserSchema = new mongoose.Schema<MongooseDataBase.User>({
  ...baseModal,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://i.pravatar.cc/300",
  },
  verified: {
    type: Boolean,
    default: true,
  },
});

UserSchema.pre(
  "save",
  async function (
    this: mongoose.Document & {
      password: string;
      isModified: (path: string) => boolean;
    },
    next,
  ) {
    if (!this.isModified("password") || !this.password) return next();
    this.password = (await hashPassword(this.password)) as string;
    next();
  },
);

UserSchema.methods.correctPassword = async (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> => {
  if (!candidatePassword || !userPassword) return false;

  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

export default User;
