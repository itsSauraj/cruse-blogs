import React from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function SignInForm() {
  const [errors, setErrors] = React.useState<
    Record<string, string> | undefined
  >({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    fetch("/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          setErrors(data);
        });
      }
      if (res.ok) {
        router.push("/dashboard");
      }
    });
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      validationErrors={errors}
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        className="min-w-[300px]"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />

      <Input
        isRequired
        className="min-w-[300px]"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Sign In
        </Button>
      </div>
    </Form>
  );
}
