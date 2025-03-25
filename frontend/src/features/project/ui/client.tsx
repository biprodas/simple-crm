"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetProjectsQuery } from "~/features/project/apis/queries";

export const ProjectClient = () => {
  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useGetProjectsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={project?.data || []}
      searchKey="name"
    />
  );
};
