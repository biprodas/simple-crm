"use client";

import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useNewLead } from "~/features/lead/hooks/use-new-lead";
import { Heading } from "../_components/heading";
import { LeadClient } from "./_components/client";

const LeadPage = () => {
  const newLead = useNewLead();

  return (
    <div className="p-3">
      <Heading
        title="Leads"
        description="List of leads"
        extra={
          <Button onClick={newLead.onOpen} className="rounded-full">
            <Plus className="size-4" />
            Add new
          </Button>
        }
      />
      <LeadClient />
    </div>
  );
};

export default LeadPage;
