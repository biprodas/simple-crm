"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetCredentialsQuery } from "~/features/credential/apis/queries";

export const CredentialClient = () => {
  const {
    data: credential,
    isLoading,
    isError,
    error,
  } = useGetCredentialsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={credential?.data || []}
      searchKey="name"
    />
  );
};
