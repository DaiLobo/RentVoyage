import { Minus, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormNumberInputProps {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  className?: string;
}

export const FormNumberInput: React.FC<FormNumberInputProps> = ({ name, label, min = 1, max = 15, className }) => {
  const form = useFormContext();

  function onClick(adjustment: number) {
    // form.setValue(name, Math.max(min, Math.min(max, form.watch(name) + adjustment)));
    const currentValue = form.watch(name) || min;
    const newValue = Math.max(min, Math.min(max, currentValue + adjustment));
    form.setValue(name, newValue);
  }

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={`flex flex-col self-center ${className}`} >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onClick(-1)}
                // disabled={field.value <= min}
                disabled={(field.value || min) <= min}
                className="h-6 w-6 shrink-0 rounded-full p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id={name}
                // type="number"
                className="text-center border p-2 rounded w-16 h-9"
                {...field}
                value={field.value || min}
                onChange={(e) => {
                  const newValue = Number(e.target.value) || min;
                  if (newValue >= min && newValue <= max) {
                    field.onChange(newValue);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onClick(1)}
                disabled={(field.value || min) >= max}
                className="h-6 w-6 shrink-0 rounded-full p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem >
      )}
    />);
}