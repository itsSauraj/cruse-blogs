import Link from "next/link";
import { Alert, Button } from "@nextui-org/react";

export default function JoinAlert() {
  return (
    <div className="flex items-center justify-center w-full">
      <Alert
        color="warning"
        description="Join our community and publish your own content"
        endContent={
          <Button
            as={Link}
            color="warning"
            href="/auth/signup"
            size="sm"
            variant="flat"
          >
            Join now
          </Button>
        }
        title="Publish your own content"
        variant="faded"
      />
    </div>
  );
}
