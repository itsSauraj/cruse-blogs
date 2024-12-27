import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import { WithGoogle } from "./forms";
import RegisterAlert from "./registerAlert";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  const path = pathname.split("/")[2];

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <Card className="px-4 py-8 dark:shadow-h-white-sm">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">
            {path === "signin" ? "Sign In" : "Sign Up"}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 px-5">{children}</CardBody>
      </Card>
      <RegisterAlert path={path} />
      <WithGoogle path={path} />
    </div>
  );
};

export default AuthLayout;
