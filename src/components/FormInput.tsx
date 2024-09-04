import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps<T extends FieldValues> {
  control?: Control<T> | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  required?: boolean;
}

// @ts-ignore
export const FormInput: React.FC<FormInputProps<T>> = ({ control, name, label, placeholder, type, className, required }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
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