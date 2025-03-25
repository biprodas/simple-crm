import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateProject,
  IProjectResponse,
  IUpdateProject,
  IProjectsResponse,
} from "./dto";

export const useGetProjectsQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IProjectsResponse,
    Error
  >({
    queryKey: ["projects"],
    queryFn: async () =>
      (
        await apiClient.get<IProjectsResponse>("/api/v1/projects", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetProjectQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IProjectResponse,
    Error
  >({
    queryKey: ["project", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IProjectResponse>(`/api/v1/projects/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-project"],
    mutationFn: async (body: ICreateProject) =>
      (await apiClient.post<IProjectResponse>("/api/v1/projects", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      console.log("Project created:", data);
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-project"],
    mutationFn: async ({ id, ...patch }: IUpdateProject) =>
      (
        await apiClient.put<IProjectResponse>(
          `/api/v1/projects/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      console.log("Project updated:", data);
    },
    onError: (error) => {
      console.error("Error updating project:", error);
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-project"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/projects/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      console.log("Project deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });
};
