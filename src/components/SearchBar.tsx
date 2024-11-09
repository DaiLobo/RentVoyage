import { Loader2, SearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SearchTypes, SearchValuesTypes } from "@/interfaces/SearchType";
import { formatDate, generateQueryString, parseDate } from "@/utils/format";

import { DateRangePicker } from "./DateRangePicker";
import { FormInput } from "./FormInput";
import { FormNumberInput } from "./FormNumberInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

export const SearchBar: React.FC<SearchTypes> = ({ localization, startDate, endDate, guests = 0, minPrice = 10, maxPrice = 1000, setFilteredHits }) => {
  const { t } = useTranslation("stays");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      localization: localization,
      startEndDate: {
        from: parseDate(startDate),
        to: parseDate(endDate)
      },
      guests: guests || 0
    }
  });

  const handleSearch = async (values: SearchValuesTypes) => {
    setIsLoading(true);

    const { localization, startEndDate, guests } = values;
    const { from, to } = startEndDate;

    try {
      const response = await fetch(`/api/search?localization=${localization}&from=${from !== null ? formatDate(from) : ""}&to=${to !== null ? formatDate(to) : ""}&guests=${guests}&minPrice=${minPrice}&maxPrice=${maxPrice}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const { hits } = await response.json();
      setFilteredHits(hits);

    } catch (error) {
      console.error('Erro na pesquisa:', error);
    } finally {
      setIsLoading(false);

      const query = generateQueryString(
        {
          startDate: from ?? null,
          endDate: to ?? null
        },
        values?.guests ?? null,
        values?.localization ?? null,
        minPrice,
        maxPrice
      );

      Router.push(`/booking?${query}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)} className="w-full">
        <div className="grid grid-cols-1 gap-4 items-center p-4 pb-6 shadow-md rounded-lg bg-white mb-8 w-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">

          <FormInput
            className="w-full col-span-1 sm:col-span-1 lg:col-span-2"
            type="text"
            name="localization"
            label={t("search.local.name")}
            placeholder={t("search.local.placeholder")}
          />

          <DateRangePicker
            name="startEndDate"
            disabled={(date) => date < new Date()}
            label={t("search.startEndDate.name")}
            placeholder={t("search.startEndDate.placeholder")}
            className="w-full col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2"
          />

          <FormNumberInput
            name="guests"
            label={t("search.guests.name")}
            className="w-full col-span-1"
          />

          <div className="items-center self-end col-span-1 md:col-start-4 lg:col-span-1">
            <Button disabled={isLoading} type="submit" className="gap-2 w-full">
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />
              )}
              {t("search.title")} <SearchIcon />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}