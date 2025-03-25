import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateInvoice,
  IInvoiceResponse,
  IUpdateInvoice,
  IInvoicesResponse,
} from "./dto";

export const useGetInvoicesQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IInvoicesResponse,
    Error
  >({
    queryKey: ["invoices"],
    queryFn: async () =>
      (
        await apiClient.get<IInvoicesResponse>("/api/v1/invoices", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetInvoiceQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IInvoiceResponse,
    Error
  >({
    queryKey: ["invoice", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IInvoiceResponse>(`/api/v1/invoices/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateInvoiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-invoice"],
    mutationFn: async (body: ICreateInvoice) =>
      (await apiClient.post<IInvoiceResponse>("/api/v1/invoices", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      console.log("Invoice created:", data);
    },
    onError: (error) => {
      console.error("Error creating invoice:", error);
    },
  });
};

export const useUpdateInvoiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-invoice"],
    mutationFn: async ({ id, ...patch }: IUpdateInvoice) =>
      (
        await apiClient.put<IInvoiceResponse>(
          `/api/v1/invoices/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      console.log("Invoice updated:", data);
    },
    onError: (error) => {
      console.error("Error updating invoice:", error);
    },
  });
};

export const useDeleteInvoiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-invoice"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/invoices/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      console.log("Invoice deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting invoice:", error);
    },
  });
};
