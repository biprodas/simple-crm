"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Heading } from "~/features/dashboard/ui/heading";
import { InvoiceClient } from "./client";
import { useNewInvoice } from "../hooks/use-new-invoice";

export const InvoiceScreen = () => {
  const newInvoice = useNewInvoice();

  return (
    <div className="p-3">
      <Heading
        title="Invoices"
        description="List of invoices"
        extra={
          <Button onClick={newInvoice.onOpen} className="rounded-full">
            <PlusIcon className="size-4" />
            Add new
          </Button>
        }
      />
      <InvoiceClient />
    </div>
  );
};
