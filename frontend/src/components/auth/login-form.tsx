"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "~/actions/login";
import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { LoginSchema } from "~/schemas/auth";
import GoogleIcon from "~/icons/google";
import { signIn } from "~/auth";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const errorUrl =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    console.log("Credentials", values);

    const result = await login(values, callbackUrl);
    toast.success("Login successful");
    
    console.log("final result", result);

    // startTransition(() => {
    //   login(values, callbackUrl)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data.error);
    //       }

    //       if (data?.success) {
    //         form.reset();
    //         setSuccess(data.success);
    //       }

    //       if (data?.twoFactor) {
    //         setShowTwoFactor(true);
    //       }
    //     })
    //     .catch(() => setError("Something went wrong!"));
    // });
  };

  return (
    <div className="flex flex-col w-full max-w-sm gap-5">
      <Link
        href="/"
        className="flex items-center gap-2 self-center font-medium"
      >
        <Image
          src="/crm.png"
          alt="logo"
          width={500}
          height={500}
          className="size-8"
        />
        Simple CRM
      </Link>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4">
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two factor code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="123456"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {!showTwoFactor && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor={field.name}>Email</Label>
                          <FormControl>
                            <Input
                              {...field}
                              id={field.name}
                              disabled={isPending}
                              placeholder="john.doe@example.com"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <Label htmlFor={field.name}>Password</Label>
                            <Link
                              href="/forgot-password"
                              className="ml-auto text-xs underline-offset-4 hover:underline"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              id={field.name}
                              disabled={isPending}
                              placeholder="********"
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error || errorUrl} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending} className="w-full">
                {showTwoFactor ? "Confirm" : "Login"}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full">
                  <GoogleIcon />
                  Login with Google
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium hover:underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
};
