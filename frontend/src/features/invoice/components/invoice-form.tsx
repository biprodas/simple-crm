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
import { Textarea } from "~/components/ui/textarea";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  invoiceNo: z.string().optional(),
  amount: z.string().optional(),
  discount: z.string().optional(),
  issueDate: z.string().optional(),
  dueDate: z.string().optional(),
  description: z.string().optional(),
  // status: z.string().optional(),
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

export const InvoiceForm = ({
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
                      placeholder="Enter invoice name"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Descripiton
                </Label>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter description"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="invoiceNo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Invoice No
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter invoice number"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Amount
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter amount"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="discount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Discount
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter discount"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="issueDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Issue Date
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter issue date"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="dueDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Due Date
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

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Invoice"}
        </Button>
      </form>
    </Form>
  );
};
