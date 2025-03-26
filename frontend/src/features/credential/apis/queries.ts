import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateCredential,
  ICredentialResponse,
  IUpdateCredential,
  ICredentialsResponse,
} from "./dto";

export const useGetCredentialsQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ICredentialsResponse,
    Error
  >({
    queryKey: ["credentials"],
    queryFn: async () =>
      (
        await apiClient.get<ICredentialsResponse>("/api/v1/credentials", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetCredentialQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ICredentialResponse,
    Error
  >({
    queryKey: ["credential", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<ICredentialResponse>(`/api/v1/credentials/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateCredentialMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-credential"],
    mutationFn: async (body: ICreateCredential) =>
      (await apiClient.post<ICredentialResponse>("/api/v1/credentials", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      console.log("Credential created:", data);
    },
    onError: (error) => {
      console.error("Error creating credential:", error);
    },
  });
};

export const useUpdateCredentialMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-credential"],
    mutationFn: async ({ id, ...patch }: IUpdateCredential) =>
      (
        await apiClient.put<ICredentialResponse>(
          `/api/v1/credentials/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      console.log("Credential updated:", data);
    },
    onError: (error) => {
      console.error("Error updating credential:", error);
    },
  });
};

export const useDeleteCredentialMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-credential"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/credentials/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      console.log("Credential deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting credential:", error);
    },
  });
};
