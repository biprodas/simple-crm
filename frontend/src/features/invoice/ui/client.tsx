"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetInvoicesQuery } from "~/features/invoice/apis/queries";

export const InvoiceClient = () => {
  const {
    data: invoice,
    isLoading,
    isError,
    error,
  } = useGetInvoicesQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={invoice?.data || []}
      searchKey="name"
    />
  );
};
