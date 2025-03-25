"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Heading } from "~/features/dashboard/ui/heading";
import { CustomerClient } from "./client";
import { useNewCustomer } from "../hooks/use-new-customer";

export const CustomerScreen = () => {
  const newCustomer = useNewCustomer();

  return (
    <div className="p-3">
      <Heading
        title="Customers"
        description="List of customers"
        extra={
          <Button onClick={newCustomer.onOpen} className="rounded-full">
            <PlusIcon className="size-4" />
            Add new
          </Button>
        }
      />
      <CustomerClient />
    </div>
  );
};
