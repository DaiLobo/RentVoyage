import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Matcher } from "react-day-picker";
import { Control, FieldValues, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { X } from "@phosphor-icons/react";

interface DateRangePickerProps {
  control?: Control<FieldValues> | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: Matcher | Matcher[];
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ control, name, label, placeholder, disabled, className }) => {
  const form = useFormContext();

  return <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={`flex flex-col self-center ${className}`} >
        <FormLabel>{label}</FormLabel>
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "bg-white justify-start text-left font-normal hover:bg-terceary/[0.4] hover:text-black border-input placeholder:text-muted-foreground",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4 opacity-50 group-hover:text-muted-foreground" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y")} -{" "}
                        {format(field.value.to, "LLL dd, y")}
                        <span className="flex flex-1 justify-end z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            form.setValue(name, {
                              from: null, to: null
                            })
                          }}>
                          <X color="gray" />
                        </span>
                      </>
                    ) : (
                      <>
                        {format(field.value.from, "LLL dd, y")}
                        <span className="flex flex-1 justify-end z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            form.setValue(name, {
                              from: null, to: null
                            })
                          }}>
                          <X color="gray" />
                        </span>
                      </>

                    )
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value?.from}
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={2}
                disabled={disabled}
              />
            </PopoverContent>
          </Popover>
        </div>
        <FormMessage />
      </FormItem >
    )}
  />
}