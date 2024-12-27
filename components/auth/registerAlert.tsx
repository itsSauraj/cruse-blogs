import Link from "next/link";
import { Alert, Button } from "@nextui-org/react";

export default function RegisterAlert({ path }: { path: string }) {

  return (
    <div className="flex items-center justify-center w-full relative">
      <Alert
        className="w-[100%]"
        color="primary"
        description={
          path === "signup"
            ? "Sign in to your account"
            : "Sign up to join our community and publish your own content"
        }
        endContent={
          <Button
            as={Link}
            color="primary"
            href={`/auth/${path === "signup" ? "signin" : "signup"}`}
            size="sm"
            variant="flat"
          >
            {path === "signup" ? "Sign In" : "Sign Up"}
          </Button>
        }
        title={
          path === "signup"
            ? "Already have an account?"
            : "Don't have an account?"
        }
        variant="faded"
      />
    </div>
  );
}
