"use client";

import { useMountedState } from "react-use";
import { EditLeadSheet } from "~/features/lead/components/edit-lead-sheet";
import { NewLeadSheet } from "~/features/lead/components/new-lead-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewLeadSheet />
      <EditLeadSheet />
    </>
  );
};
