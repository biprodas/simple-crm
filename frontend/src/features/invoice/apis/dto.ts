export type InvoiceStatus =
  | "Draft"
  | "Ready to Send"
  | "Sent"
  | "Unpaid"
  | "Canceled"
  | "Paid";

export interface IInvoice {
  id: string;
  name: string;
  invoiceNo: string;
  amount: number;
  discount: number;
  issueDate: Date;
  dueDate: Date;
  description: string;
  // status: InvoiceStatus;
  // assignee
  // accountId
  // projectId
  // milestoneId
  // attachment
}

export interface ICreateInvoice {
  name: string;
  invoiceNo?: string;
  amount?: string;
  discount?: string;
  issueDate?: Date;
  dueDate?: Date;
  description?: string;
}

export interface IUpdateInvoice {
  id: string;
  name: string;
  invoiceNo?: string;
  amount?: string;
  discount?: string;
  issueDate?: Date;
  dueDate?: Date;
  description?: string;
}

export interface IChangeInvoiceStatus {
  id: string;
  status: InvoiceStatus;
}

export interface IInvoicesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IInvoice[];
}

export interface IInvoiceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IInvoice;
}
