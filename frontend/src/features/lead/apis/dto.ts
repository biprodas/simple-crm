export type LeadStatus =
  | "New Lead"
  | "Attempt to Engage"
  | "Engaged"
  | "Unqualified - Follow"
  | "Qualified";

export interface ILead {
  id: string;
  name: string;
  description: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  // customers: CustomerEntity[];
}

export interface ICreateLead {
  name: string;
  description?: string;
  contactName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  source?: string;
  // status?: LeadStatus;
}

export interface IUpdateLead {
  id: string;
  name?: string;
  description?: string;
  contactName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  source?: string;
}

export interface IChangeLeadStatus {
  id: string;
  status: LeadStatus;
}

export interface ILeadsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ILead[];
}

export interface ILeadResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ILead;
}
