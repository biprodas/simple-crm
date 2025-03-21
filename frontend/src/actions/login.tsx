"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "~/auth";
import { LoginSchema } from "~/schemas/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const redirectTo = callbackUrl || DEFAULT_LOGIN_REDIRECT;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirectTo,
      redirect: !!redirectTo,
    });
    console.log("action login result", result);
    return result;
  } catch (error) {
    console.log("AuthError Details:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
