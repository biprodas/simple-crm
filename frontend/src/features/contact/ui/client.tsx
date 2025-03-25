"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetContactsQuery } from "~/features/contact/apis/queries";

export const ContactClient = () => {
  const {
    data: contact,
    isLoading,
    isError,
    error,
  } = useGetContactsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={contact?.data || []}
      searchKey="name"
    />
  );
};
