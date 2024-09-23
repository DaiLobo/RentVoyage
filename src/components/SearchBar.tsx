import { SearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { useForm } from "react-hook-form";

import { SearchTypes, SearchValuesTypes } from "@/interfaces/SearchType";
import { generateQueryString, parseDate } from "@/utils/format";

import { DateRangePicker } from "./DateRangePicker";
import { FormInput } from "./FormInput";
import { FormNumberInput } from "./FormNumberInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

export const SearchBar: React.FC<SearchTypes> = ({ localization, startDate, endDate, guests }) => {
  const { t } = useTranslation("stays");

  const form = useForm({
    defaultValues: {
      localization: localization,
      startEndDate: {
        from: parseDate(startDate),
        to: parseDate(endDate)
      },
      guests: 0
    }
  });

  const handleSearch = (values: SearchValuesTypes) => {
    const query = generateQueryString(
      {
        startDate: values?.startEndDate?.from ?? null,
        endDate: values?.startEndDate?.to ?? null
      },
      values?.guests ?? null,
      values?.localization ?? null
    );

    Router.push(`/booking?${query}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <div className="grid grid-cols-5 gap-4 items-center p-4 pb-6 shadow-lg rounded-lg bg-white mb-8 w-[916px]">

          <FormInput type="text" name="localization" label={t("search.local.name")} placeholder={t("search.local.placeholder")} />
          <DateRangePicker name="startEndDate" disabled={(date) => date < new Date()} label={t("search.startEndDate.name")} placeholder={t("search.startEndDate.placeholder")} className="w-full col-span-2" />
          <FormNumberInput name="guests" label={t("search.guests.name")} />

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