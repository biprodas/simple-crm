import { ILead } from "~/features/lead/apis/dto";

export type CustomerType = "Personal" | "Company";
export type CustomerTier = "Bronze" | "Silver" | "Gold";
export type CustomerStatus =
  | "Prospect"
  | "At Risk"
  | "Active"
  | "Lost Deal"
  | "Closed";

export interface ICustomer {
  id: string;
  name: string;
  type: CustomerType;
  email: string;
  phone: string;
  address: string;
  billRate: string;
  tier: CustomerTier;
  leadId: string;
  lead: Pick<ILead, "id" | "name">;
  status: CustomerStatus;
}

export interface ICreateCustomer {
  name: string;
  type?: CustomerType;
  email?: string;
  phone?: string;
  address?: string;
  billRate?: string;
  tier?: CustomerTier;
  leadId?: string;
}

export interface IUpdateCustomer {
  id: string;
  name: string;
  type?: CustomerType;
  email?: string;
  phone?: string;
  address?: string;
  billRate?: string;
  tier?: CustomerTier;
  leadId?: string;
}

export interface IChangeCustomerStatus {
  id: string;
  status: CustomerStatus;
}

export interface ICustomersResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: ICustomer[];
}

export interface ICustomerResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: ICustomer;
}
