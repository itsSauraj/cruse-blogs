import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/react";
import Image from "next/image";

import GoogleIcon from "@/assets/google-icon.svg";

const WithGoogle = ({ path }: { path: string }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center w-full gap-2 flex-grow">
        <Divider />
        <p>OR</p>
        <Divider />
      </div>
      <Button fullWidth className="dark:shadow-h-white-lg flex" variant="flat">
        <p>{path === "signup" ? "Sign Up" : "Sign In"} with Google</p>
        <div className="w-[30px]">
          <Image alt="?" height={30} src={GoogleIcon.src} width={30} />
        </div>
      </Button>
    </div>
  );
};

export default WithGoogle;
