import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Matcher } from "react-day-picker";
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
  className?: string;
  disabled?: Matcher | Matcher[];
}

export const DatePicker: React.FC<DatePickerProps> = ({ control, name, label, placeholder, required, disabled, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={`flex flex-col self-center ${className}`} >
        <FormLabel>{label}</FormLabel>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "group pl-3 text-left font-normal hover:bg-terceary/[0.4] hover:text-black border-input placeholder:text-muted-foreground",
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
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              required={required}
              mode="single"
              captionLayout="dropdown-buttons"
              selected={field.value}
              onSelect={field.onChange}
              onDayClick={() => setIsOpen(false)}
              fromYear={1960}
              toYear={2070}
              disabled={disabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <FormMessage />
      </FormItem >
    )}
  />
}