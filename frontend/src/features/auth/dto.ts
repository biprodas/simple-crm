import { ApiResponse, ITokenResponse } from "~/types";

export interface IUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  isEmailVerified?: boolean;
}

export interface ISigninInput {
  email: string;
  password: string;
}

export interface ISignupInput {
  name: string;
  username?: string;
  email: string;
  password: string;
}

export interface ISignupResponse2 {
  success: boolean;
  statusCode: number;
  message: string;
  data: ITokenResponse[];
}

export type ISigninResponse = ApiResponse<ITokenResponse>;
export type ISignupResponse = ApiResponse<ITokenResponse>;
