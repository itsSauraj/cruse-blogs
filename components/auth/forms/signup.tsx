import React from "react";
import { useRouter } from "next/router";
import { Form, Input, Button } from "@nextui-org/react";

export default function SignUpForm() {
  const [errors, setErrors] = React.useState<
    Record<string, string> | undefined
  >({});
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));

    fetch("/api/v1/auth/signup", {
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
      onSubmit={handleFormSubmit}
    >
      <Input
        isRequired
        className="min-w-[300px]"
        label="Name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter your name"
        type="text"
      />

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
        name="password1"
        placeholder="Password"
        type="password"
      />

      <Input
        isRequired
        className="min-w-[300px]"
        label="Confirm Password"
        labelPlacement="outside"
        name="password2"
        placeholder="Confirm Password"
        type="password"
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
