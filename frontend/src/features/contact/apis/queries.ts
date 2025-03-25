import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateContact,
  IContactResponse,
  IUpdateContact,
  IContactsResponse,
} from "./dto";

export const useGetContactsQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IContactsResponse,
    Error
  >({
    queryKey: ["contacts"],
    queryFn: async () =>
      (
        await apiClient.get<IContactsResponse>("/api/v1/contacts", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetContactQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IContactResponse,
    Error
  >({
    queryKey: ["contact", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IContactResponse>(`/api/v1/contacts/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-contact"],
    mutationFn: async (body: ICreateContact) =>
      (await apiClient.post<IContactResponse>("/api/v1/contacts", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      console.log("Contact created:", data);
    },
    onError: (error) => {
      console.error("Error creating contact:", error);
    },
  });
};

export const useUpdateContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-contact"],
    mutationFn: async ({ id, ...patch }: IUpdateContact) =>
      (
        await apiClient.put<IContactResponse>(
          `/api/v1/contacts/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      console.log("Contact updated:", data);
    },
    onError: (error) => {
      console.error("Error updating contact:", error);
    },
  });
};

export const useDeleteContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-contact"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/contacts/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      console.log("Contact deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting contact:", error);
    },
  });
};
