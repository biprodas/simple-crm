import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// import { ContextCookies } from '../cookies-manager';
import { Session } from 'next-auth';
export type Unpromisify<T> = T extends Promise<infer R> ? R : T;

export type AnyObject = Record<string, any>;
export type AnyArray = unknown[];
export type AnyObjectOrArray = AnyObject | AnyArray;
export type MapBool<I = any> = (
  item: I,
  index?: number,
  array?: I[],
) => boolean;
export type MiddlewareContext = {
  pathname: string;
  isSessionValid?: boolean;
  session?: Session | null;
  // cookies: ReturnType<typeof ContextCookies>;
};

export type MiddlewareFunction = (
  req: NextRequest,
  ev: NextFetchEvent,
  context: MiddlewareContext,
) => Promise<NextResponse | void>;

export type ApiResponse<T = any> = {
  data: T;
  status_code: number;
  message: string;
  detail?: string;
};

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  options: {
    paginationSettings: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      nextPage: number;
      previousPage: number;
      limit: number;
    };
  };
}

export type ServerSideResponse<T = any> = ApiResponse<T>;

export type SocketStatus =
  | 'CONNECTING'
  | 'OPEN'
  | 'CLOSED'
  | 'CLOSING'
  | 'UNINSTANTIATED';

export enum ChatShowType {
  Transcription = 'transcription',
  Translation = 'translation',
  Both = 'both',
}
