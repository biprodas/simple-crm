import apiClient from "~/utils/axios";
import {
  ICreateCredential,
  ICredentialResponse,
  ICredentialsResponse,
  IUpdateCredential,
} from "./dto";

export const getCredentials = async () => {
  const res = await apiClient.get<ICredentialsResponse>("/api/v1/Credentials");
  return res.data;
};

export const getCredential = async (credentialId: string) => {
  const res = await apiClient.get<ICredentialResponse>(
    `/api/v1/Credentials/${credentialId}`
  );
  return res.data;
};

export const createCredential = async (data: ICreateCredential) => {
  const res = await apiClient.post<ICredentialResponse>(
    "/api/v1/Credentials",
    data
  );
  return res.data;
};

export const updateCredential = async (
  credentialId: string,
  data: IUpdateCredential
) => {
  const res = await apiClient.put<ICredentialResponse>(
    `/api/v1/Credentials/${credentialId}`,
    data
  );
  return res.data;
};

export const deleteCredential = async (credentialId: string) => {
  const res = await apiClient.delete(`/api/v1/Credentials/${credentialId}`);
  return res.data;
};
