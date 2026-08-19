"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import Link from "next/link";
import Image from "next/image";
import { loginFormSchema, LoginFormValues } from "../schema/login.schema";
import { FormController } from "@/components/Controller";
import { useLogin } from "../hooks/useLogin";
import { Loader2 } from "lucide-react";

export const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <Button className="w-full" variant="outline">
            <Image
              src={"/google-icon.svg"}
              width={16}
              height={16}
              alt="Continue with Google"
            />
            Continue with Google
          </Button>
          <div className="my-4 flex items-center">
            <div className="h-px flex-1 bg-border"></div>
            <div className="text-muted-foreground mx-2 text-xs">OR</div>
            <div className="h-px flex-1 bg-border"></div>
          </div>
          <FieldGroup>
            <FormController
              name="email"
              control={form.control}
              placeholder="john_doe@example.com"
              label="Email"
              type="email"
            />
            <FormController
              name="password"
              control={form.control}
              placeholder="********"
              label="Password"
              type="password"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button
            type="submit"
            form="login-form"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary underline-offset-4 transition hover:underline"
            >
              Register
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
};
