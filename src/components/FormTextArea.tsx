import { Control, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";

interface FormTextAreaProps<T extends FieldValues> {
  control?: Control<T> | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

// @ts-ignore
export const FormTextArea: React.FC<FormTextAreaProps<T>> = ({ control, name, label, placeholder, className, required }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              id={name}
              required={required}
              placeholder={placeholder}
              className={className}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />);
}