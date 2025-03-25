import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateCustomer,
  ICustomerResponse,
  IUpdateCustomer,
  ICustomersResponse,
} from "./dto";

export const useGetCustomersQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ICustomersResponse,
    Error
  >({
    queryKey: ["customers"],
    queryFn: async () =>
      (
        await apiClient.get<ICustomersResponse>("/api/v1/customers", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetCustomerQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ICustomerResponse,
    Error
  >({
    queryKey: ["customer", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<ICustomerResponse>(`/api/v1/customers/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateCustomerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-customer"],
    mutationFn: async (body: ICreateCustomer) =>
      (await apiClient.post<ICustomerResponse>("/api/v1/customers", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Customer created:", data);
    },
    onError: (error) => {
      console.error("Error creating customer:", error);
    },
  });
};

export const useUpdateCustomerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-customer"],
    mutationFn: async ({ id, ...patch }: IUpdateCustomer) =>
      (
        await apiClient.put<ICustomerResponse>(
          `/api/v1/customers/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Customer updated:", data);
    },
    onError: (error) => {
      console.error("Error updating customer:", error);
    },
  });
};

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-customer"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/customers/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Customer deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting customer:", error);
    },
  });
};
