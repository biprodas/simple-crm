import apiClient from "~/utils/axios";
import {
  ICreateContact,
  IContactResponse,
  IContactsResponse,
  IUpdateContact,
} from "./dto";

export const getContacts = async () => {
  const res = await apiClient.get<IContactsResponse>("/api/v1/Contacts");
  return res.data;
};

export const getContact = async (contactId: string) => {
  const res = await apiClient.get<IContactResponse>(
    `/api/v1/Contacts/${contactId}`
  );
  return res.data;
};

export const createContact = async (data: ICreateContact) => {
  const res = await apiClient.post<IContactResponse>(
    "/api/v1/Contacts",
    data
  );
  return res.data;
};

export const updateContact = async (
  contactId: string,
  data: IUpdateContact
) => {
  const res = await apiClient.put<IContactResponse>(
    `/api/v1/Contacts/${contactId}`,
    data
  );
  return res.data;
};

export const deleteContact = async (contactId: string) => {
  const res = await apiClient.delete(`/api/v1/Contacts/${contactId}`);
  return res.data;
};
