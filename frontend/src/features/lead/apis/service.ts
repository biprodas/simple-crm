import apiClient from "~/utils/axios";
import {
  ICreateLead,
  ILeadResponse,
  ILeadsResponse,
  IUpdateLead,
} from "./dto";

export const getLeads = async () => {
  const res = await apiClient.get<ILeadsResponse>("/api/v1/Leads");
  return res.data;
};

export const getLead = async (leadId: string) => {
  const res = await apiClient.get<ILeadResponse>(
    `/api/v1/Leads/${leadId}`
  );
  return res.data;
};

export const createLead = async (data: ICreateLead) => {
  const res = await apiClient.post<ILeadResponse>(
    "/api/v1/Leads",
    data
  );
  return res.data;
};

export const updateLead = async (
  leadId: string,
  data: IUpdateLead
) => {
  const res = await apiClient.put<ILeadResponse>(
    `/api/v1/Leads/${leadId}`,
    data
  );
  return res.data;
};

export const deleteLead = async (leadId: string) => {
  const res = await apiClient.delete(`/api/v1/Leads/${leadId}`);
  return res.data;
};
