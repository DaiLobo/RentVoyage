import { useSearchBox } from "react-instantsearch";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";

interface LocalSearchInputProps {
  onSelect: (selected: string) => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

export const LocalSearchInput: React.FC<LocalSearchInputProps> = ({ onSelect, className, label, placeholder }) => {
  const { query, refine } = useSearchBox();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    refine(event.currentTarget.value);
    onSelect(event.currentTarget.value);
  }

  return (
    <div className="flex flex-col self-center gap-2">
      <Label>{label}</Label>
      <Input
        type="text"
        value={query}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className={`w-full ${className}`}
      />
    </div>
  );
};