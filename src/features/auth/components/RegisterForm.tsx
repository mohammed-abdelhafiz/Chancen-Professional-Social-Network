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
import {
  registerFormSchema,
  RegisterFormValues,
} from "../schema/register.schema";
import { FormController } from "@/components/Controller";
import { useRegister } from "../hooks/useRegister";
import { Loader2 } from "lucide-react";
import { SocialLoginButtons } from "./SocialLoginButtons";

export const RegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useRegister();

  function onSubmit(data: RegisterFormValues) {
    registerMutation.mutate(data);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <SocialLoginButtons />
          <div className="my-4 flex items-center">
            <div className="h-px flex-1 bg-border"></div>
            <div className="text-muted-foreground mx-2 text-xs">OR</div>
            <div className="h-px flex-1 bg-border"></div>
          </div>
          <FieldGroup>
            <FormController
              name="firstName"
              control={form.control}
              placeholder="John"
              label="First Name"
              type="text"
            />
            <FormController
              name="lastName"
              control={form.control}
              placeholder="Doe"
              label="Last Name"
              type="text"
            />
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
            form="register-form"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary underline-offset-4 transition hover:underline"
            >
              Sign in
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
};
