"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Heading } from "~/features/dashboard/ui/heading";
import { ContactClient } from "./client";
import { useCreateContact } from "../hooks/use-create-contact";

export const ContactScreen = () => {
  const newContact = useCreateContact();

  return (
    <div className="p-3">
      <Heading
        title="Contacts"
        description="List of contacts"
        extra={
          <Button onClick={newContact.onOpen} className="rounded-full">
            <PlusIcon className="size-4" />
            Add new
          </Button>
        }
      />
      <ContactClient />
    </div>
  );
};
