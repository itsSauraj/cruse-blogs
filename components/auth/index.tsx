import React from "react";

import FormLayout from "./layout";
import { SignUp, SignIn } from "./forms";

const AuthFrom = ({ load }: { load: string }) => {
  return (
    <FormLayout>
      {load === "signup" && <SignUp />}
      {load === "signin" && <SignIn />}
    </FormLayout>
  );
};

export default AuthFrom;
