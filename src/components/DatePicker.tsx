import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerProps {
  control?: Control<FieldValues> | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({ control, name, label, placeholder, required }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col self-center">
        <FormLabel>{label}</FormLabel>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "group pl-3 text-left font-normal bg-background hover:bg-terceary/[0.4] hover:text-black border-input placeholder:text-muted-foreground",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span className=
                    "text-muted-foreground"
                  >{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50 group-hover:text-muted-foreground" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background" align="start">
            <Calendar
              required={required}
              mode="single"
              captionLayout="dropdown-buttons"
              selected={field.value}
              onSelect={field.onChange}
              onDayClick={() => setIsOpen(false)}
              fromYear={1960}
              toYear={2030}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <FormMessage />
      </FormItem >
    )}
  />
}