"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Heading } from "~/features/dashboard/ui/heading";
import { CredentialClient } from "./client";
import { useNewCredential } from "../hooks/use-new-credential";

export const CredentialScreen = () => {
  const newCredential = useNewCredential();

  return (
    <div className="p-3">
      <Heading
        title="Credentials"
        description="List of credentials"
        extra={
          <Button onClick={newCredential.onOpen} className="rounded-full">
            <PlusIcon className="size-4" />
            Add new
          </Button>
        }
      />
      <CredentialClient />
    </div>
  );
};
