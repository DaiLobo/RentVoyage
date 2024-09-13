import { Minus, Plus, SearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SearchTypes, SearchValuesTypes } from "@/interfaces/SearchType";
import { generateQueryString, parseDate } from "@/utils/format";

import { DatePicker } from "./DatePicker";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const SearchBar: React.FC<SearchTypes> = ({ localization, startDate, endDate, guests }) => {
  const [updateGuests, setUpdateGuests] = useState<number>(guests ?? 0);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("stays");

  const form = useForm({
    defaultValues: {
      localization: localization,
      startDate: parseDate(startDate),
      endDate: parseDate(endDate),
      guests
    }
  });

  function handleNumberGuests(adjustment: number) {
    setUpdateGuests(Math.max(1, Math.min(15, updateGuests + adjustment)))
  }

  const handleSearch = async (values: SearchValuesTypes) => {
    console.log(values, updateGuests);

    const query = generateQueryString(
      {
        startDate: values?.startDate,
        endDate: values?.endDate
      },
      updateGuests
    );

    Router.push(`/booking?${query}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <div className="grid grid-cols-5 gap-4 items-center p-4 pb-6 shadow-lg rounded-lg bg-white mb-8 w-[916px]">

          <FormInput type="text" name="localization" label={t("search.local.name")} placeholder={t("search.local.placeholder")} />

          <DatePicker disabled={(date) => date < new Date()} name="startDate" label="Check-in" placeholder="Check-in" className="self-end" />
          <DatePicker disabled={(date) => date < new Date()} name="endDate" label="Check-out" placeholder="Check-out" className="self-end" />

          <div className="flex flex-col gap-2 self-end">
            <Label>Guests</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" className="font-normal justify-start border-slades text-muted-foreground hover:bg-terceary/[0.4] hover:text-black w-full">
                  {updateGuests < 1 ? t("search.guests.name") : `${updateGuests} ${t("search.guests.placeholder")}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-4 px-5" align="start">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="h-6 w-6 shrink-0 rounded-full p-0"
                    onClick={() => handleNumberGuests(-1)}
                    disabled={updateGuests <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>

                  <div className="text-md font-bold tracking-tighter px-2">
                    {updateGuests}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="h-6 w-6 shrink-0 rounded-full p-0"
                    onClick={() => handleNumberGuests(1)}
                    disabled={updateGuests >= 15}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="items-center self-end">
            <Button type="submit" className="gap-2 w-full">
              {t("search.title")} <SearchIcon />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}