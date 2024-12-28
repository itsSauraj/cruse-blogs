import mongoose from "mongoose";

import baseModal from "./baseModel";

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
});

const User = mongoose.model("User", UserSchema);

export default User;
