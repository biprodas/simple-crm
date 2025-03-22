"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetLeadsQuery } from "~/features/lead/apis/queries";

export const LeadClient = () => {
  const {
    data: lead,
    isLoading,
    isError,
    error,
  } = useGetLeadsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={lead?.data || []}
      searchKey="name"
    />
  );
};
