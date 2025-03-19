import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateLead,
  ILeadResponse,
  IUpdateLead,
  ILeadsResponse,
} from "./dto";

export const useGetLeadsQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ILeadsResponse,
    Error
  >({
    queryKey: ["leads"],
    queryFn: async () =>
      (
        await apiClient.get<ILeadsResponse>("/api/v1/leads", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetLeadQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ILeadResponse,
    Error
  >({
    queryKey: ["lead", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<ILeadResponse>(`/api/v1/leads/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateLeadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-lead"],
    mutationFn: async (body: ICreateLead) =>
      (await apiClient.post<ILeadResponse>("/api/v1/leads", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      console.log("Lead created:", data);
    },
    onError: (error) => {
      console.error("Error creating lead:", error);
    },
  });
};

export const useUpdateLeadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-lead"],
    mutationFn: async ({ id, ...patch }: IUpdateLead) =>
      (
        await apiClient.put<ILeadResponse>(
          `/api/v1/leads/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      console.log("Lead updated:", data);
    },
    onError: (error) => {
      console.error("Error updating lead:", error);
    },
  });
};

export const useDeleteLeadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-lead"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/leads/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      console.log("Lead deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting lead:", error);
    },
  });
};
