import { Control, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FormSelectProps<T extends FieldValues> {
  control?: Control<T> | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
  listOptions?: { value: string; name: string }[];
}

// @ts-ignore
export const FormSelect: React.FC<FormSelectProps<T>> = ({ control, name, label, placeholder, listOptions, className, required }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label}</FormLabel>
          <Select required={required} onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger id={name} className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {
                listOptions?.map((item, index) => <SelectItem key={index} value={item.value}>{item.name}</SelectItem>)
              }
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}