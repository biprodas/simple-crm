"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetCustomersQuery } from "~/features/customer/apis/queries";

export const CustomerClient = () => {
  const {
    data: customer,
    isLoading,
    isError,
    error,
  } = useGetCustomersQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={customer?.data || []}
      searchKey="name"
    />
  );
};
