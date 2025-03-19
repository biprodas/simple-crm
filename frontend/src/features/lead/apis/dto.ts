export interface ILead {
  id: string;
  name: string;
  acronym?: string;
}

export interface ICreateLead {
  name: string;
  acronym?: string;
}

export interface IUpdateLead {
  id: string;
  name?: string;
  acronym?: string;
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
