import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ name, label, placeholder, type, className, required }) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col self-center">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              required={required}
              className={className}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />);
}