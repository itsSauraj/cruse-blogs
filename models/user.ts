import mongoose from "mongoose";

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
    this.password = hashPassword(this.password);
    next();
  },
);

UserSchema.methods.correctPassword = (
  candidatePassword: string,
  userPassword: string,
) => {
  if (!candidatePassword || !userPassword) return false;
  const hash = hashPassword(candidatePassword);

  if (hash !== userPassword) return false;

  return true;
};

const User = mongoose.model("User", UserSchema);

export default User;
