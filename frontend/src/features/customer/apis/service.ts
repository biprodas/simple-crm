import apiClient from "~/utils/axios";
import {
  ICreateCustomer,
  ICustomerResponse,
  ICustomersResponse,
  IUpdateCustomer,
} from "./dto";

export const getCustomers = async () => {
  const res = await apiClient.get<ICustomersResponse>("/api/v1/Customers");
  return res.data;
};

export const getCustomer = async (customerId: string) => {
  const res = await apiClient.get<ICustomerResponse>(
    `/api/v1/Customers/${customerId}`
  );
  return res.data;
};

export const createCustomer = async (data: ICreateCustomer) => {
  const res = await apiClient.post<ICustomerResponse>(
    "/api/v1/Customers",
    data
  );
  return res.data;
};

export const updateCustomer = async (
  customerId: string,
  data: IUpdateCustomer
) => {
  const res = await apiClient.put<ICustomerResponse>(
    `/api/v1/Customers/${customerId}`,
    data
  );
  return res.data;
};

export const deleteCustomer = async (customerId: string) => {
  const res = await apiClient.delete(`/api/v1/Customers/${customerId}`);
  return res.data;
};
