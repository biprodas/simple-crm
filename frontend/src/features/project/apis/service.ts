import apiClient from "~/utils/axios";
import {
  ICreateProject,
  IProjectResponse,
  IProjectsResponse,
  IUpdateProject,
} from "./dto";

export const getProjects = async () => {
  const res = await apiClient.get<IProjectsResponse>("/api/v1/Projects");
  return res.data;
};

export const getProject = async (projectId: string) => {
  const res = await apiClient.get<IProjectResponse>(
    `/api/v1/Projects/${projectId}`
  );
  return res.data;
};

export const createProject = async (data: ICreateProject) => {
  const res = await apiClient.post<IProjectResponse>(
    "/api/v1/Projects",
    data
  );
  return res.data;
};

export const updateProject = async (
  projectId: string,
  data: IUpdateProject
) => {
  const res = await apiClient.put<IProjectResponse>(
    `/api/v1/Projects/${projectId}`,
    data
  );
  return res.data;
};

export const deleteProject = async (projectId: string) => {
  const res = await apiClient.delete(`/api/v1/Projects/${projectId}`);
  return res.data;
};
