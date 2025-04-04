"use client";

import { useMountedState } from "react-use";
import { CreateContactSheet } from "~/features/contact/components/create-contact-sheet";
import { EditContactSheet } from "~/features/contact/components/edit-contact-sheet";
import { EditCredentialSheet } from "~/features/credential/components/edit-credential-sheet";
import { NewCredentialSheet } from "~/features/credential/components/new-credential-sheet";
import { EditCustomerSheet } from "~/features/customer/components/edit-customer-sheet";
import { NewCustomerSheet } from "~/features/customer/components/new-customer-sheet";
import { EditInvoiceSheet } from "~/features/invoice/components/edit-invoice-sheet";
import { NewInvoiceSheet } from "~/features/invoice/components/new-invoice-sheet";
import { EditLeadSheet } from "~/features/lead/components/edit-lead-sheet";
import { NewLeadSheet } from "~/features/lead/components/new-lead-sheet";
import { EditProjectSheet } from "~/features/project/components/edit-project-sheet";
import { NewProjectSheet } from "~/features/project/components/new-project-sheet";

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

      <NewInvoiceSheet />
      <EditInvoiceSheet />

      <NewProjectSheet />
      <EditProjectSheet />

      <NewCredentialSheet />
      <EditCredentialSheet />
    </>
  );
};
