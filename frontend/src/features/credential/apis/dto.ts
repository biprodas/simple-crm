export interface ICredential {
  id: string;
  name: string;
  loginUrl: string;
  username: string;
  email: string;
  password: string;
  secret: string;
  isEnabled2FA: boolean;
  owner2FA: string;
  notes: string;
}

export interface ICreateCredential {
  name: string;
  loginUrl?: string;
  username?: string;
  email?: string;
  password?: string;
  secret?: string;
  isEnabled2FA?: boolean;
  owner2FA?: string;
  notes?: string;
}

export interface IUpdateCredential {
  id: string;
  name?: string;
  loginUrl?: string;
  username?: string;
  email?: string;
  password?: string;
  secret?: string;
  isEnabled2FA?: boolean;
  owner2FA?: string;
  notes?: string;
}

export interface ICredentialsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICredential[];
}

export interface ICredentialResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICredential;
}
