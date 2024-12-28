import mongoose from "mongoose";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

declare global {
  namespace MongooseDataBase {
    interface BaseModel extends mongoose.Document {
      created_at: date;
      updated_at: date;
      deleted_at: date;
    }

    interface User extends BaseModel {
      name: string;
      email: string;
      password: string;
      avatar?: string;
      correctPassword: (
        candidatePassword: string,
        userPassword: string,
      ) => boolean;
    }
  }
}

export {};
