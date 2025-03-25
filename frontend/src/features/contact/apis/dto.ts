export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  // isArchieved: boolean;
  // leadId: string;
  // customers: [];
}

export interface ICreateContact {
  name: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  companyName?: string;
}

export interface IUpdateContact {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  companyName?: string;
}

export interface IContactsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IContact[];
}

export interface IContactResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IContact;
}
