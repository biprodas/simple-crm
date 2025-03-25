import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  type: z.enum(["Personal", "Company"]).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  billRate: z.string().optional(),
  tier: z.enum(["Bronze", "Silver", "Gold"]).optional(),
  leadId: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export const CustomerForm = ({
  id,
  defaultValues,
  onSubmit,
  loading,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter customer name"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Account Type
                </Label>
                <div className="relative">
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select customer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Email
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Phone
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter phone no"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Address
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter address"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="billRate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Bill Rate
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter customer source"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="tier"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Tier
                </Label>
                <div className="relative">
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tier</SelectLabel>
                          <SelectItem value="Bronze">Bronze</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="Gold">Gold</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Customer"}
        </Button>
      </form>
    </Form>
  );
};
