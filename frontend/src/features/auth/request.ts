import { useMutation } from "@tanstack/react-query";
import { ISignupInput, ISignupResponse } from "./dto";
import apiClient from "~/utils/axios";

export const useSignup = () =>
  useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: ISignupInput) => {
      const { data } = await apiClient.post<ISignupResponse>(
        "/api/v1/auth/register",
        body
      );
      return data;
    },
  });
