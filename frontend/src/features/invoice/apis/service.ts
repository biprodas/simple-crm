import apiClient from "~/utils/axios";
import {
  ICreateInvoice,
  IInvoiceResponse,
  IInvoicesResponse,
  IUpdateInvoice,
} from "./dto";

export const getInvoices = async () => {
  const res = await apiClient.get<IInvoicesResponse>("/api/v1/Invoices");
  return res.data;
};

export const getInvoice = async (invoiceId: string) => {
  const res = await apiClient.get<IInvoiceResponse>(
    `/api/v1/Invoices/${invoiceId}`
  );
  return res.data;
};

export const createInvoice = async (data: ICreateInvoice) => {
  const res = await apiClient.post<IInvoiceResponse>(
    "/api/v1/Invoices",
    data
  );
  return res.data;
};

export const updateInvoice = async (
  invoiceId: string,
  data: IUpdateInvoice
) => {
  const res = await apiClient.put<IInvoiceResponse>(
    `/api/v1/Invoices/${invoiceId}`,
    data
  );
  return res.data;
};

export const deleteInvoice = async (invoiceId: string) => {
  const res = await apiClient.delete(`/api/v1/Invoices/${invoiceId}`);
  return res.data;
};
