"use client";

import { useMountedState } from "react-use";
import { CreateContactSheet } from "~/features/contact/components/create-contact-sheet";
import { EditContactSheet } from "~/features/contact/components/edit-contact-sheet";
import { EditCustomerSheet } from "~/features/customer/components/edit-customer-sheet";
import { NewCustomerSheet } from "~/features/customer/components/new-customer-sheet";
import { EditLeadSheet } from "~/features/lead/components/edit-lead-sheet";
import { NewLeadSheet } from "~/features/lead/components/new-lead-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewLeadSheet />
      <EditLeadSheet />

      <NewCustomerSheet />
      <EditCustomerSheet />

      <CreateContactSheet />
      <EditContactSheet />
    </>
  );
};
