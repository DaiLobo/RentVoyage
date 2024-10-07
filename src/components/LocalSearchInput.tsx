import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchBox } from "react-instantsearch";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LocalSearchInputProps {
  className?: string;
  label?: string;
  placeholder?: string;
}

export const LocalSearchInput: React.FC<LocalSearchInputProps> = ({ className, label, placeholder }) => {
  const { setValue } = useFormContext();
  // const { query, refine } = useSearchBox();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // refine(event.currentTarget.value */
    setValue("localization", event.currentTarget.value);
  }

  return (
    <div className="flex flex-col self-center gap-2">
      <Label>{label}</Label>
      <Input
        type="text"
        // value={query}
        // onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className={`w-full ${className}`}
      />
    </div>
  );
};