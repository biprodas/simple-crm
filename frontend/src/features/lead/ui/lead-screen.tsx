"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Heading } from "~/features/dashboard/ui/heading";
import { LeadClient } from "./client";
import { useNewLead } from "../hooks/use-new-lead";

export const LeadScreen = () => {
  const newLead = useNewLead();

  return (
    <div className="p-3">
      <Heading
        title="Leads"
        description="List of leads"
        extra={
          <Button onClick={newLead.onOpen} className="rounded-full">
            <PlusIcon className="size-4" />
            Add new
          </Button>
        }
      />
      <LeadClient />
    </div>
  );
};
