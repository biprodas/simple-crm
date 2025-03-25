import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

const SingleDatePicker = ({
  field,
  label,
  description,
  placeholder,
  readonly,
  disabled,
}: {
  field: any;
  label?: string;
  description?: string | React.ReactNode;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
}) => {
  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "min-w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              {field.value ? (
                format(field.value, "yyyy-MM-dd")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

const RangeDatePicker = ({
  field,
  label,
  description,
  placeholder,
  readonly,
  disabled,
}: {
  field: any;
  label?: string;
  description?: string | React.ReactNode;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
}) => {
  return (
    <FormItem>
      <div>{label && <FormLabel>{label}</FormLabel>}</div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "min-w-[300px] justify-start text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value.from && field.value.to ? (
              <>
                {format(new Date(field.value.from), "dd/MM/y")} -{" "}
                {format(new Date(field.value.to), "dd/MM/y")}
              </>
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={field.value}
            onSelect={field.onChange}
            numberOfMonths={2}
            disabled={(date) => date < new Date("1900-01-01")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export { SingleDatePicker, RangeDatePicker };
