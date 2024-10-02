import { Loader2, SearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { PropertyType } from "@/interfaces/PropertyType";
import { SearchTypes, SearchValuesTypes } from "@/interfaces/SearchType";
import { ALGOLIA_INDEX_NAME, searchClient } from "@/lib/algolia";
import { PropertyService } from "@/services/PropertyService";
import { generateQueryString, parseDate } from "@/utils/format";

import { DateRangePicker } from "./DateRangePicker";
import { FormNumberInput } from "./FormNumberInput";
import { LocalSearchInput } from "./LocalSearchInput";
import { Button } from "./ui/button";
import { Form, FormField } from "./ui/form";

export const SearchBar: React.FC<SearchTypes> = ({ localization, startDate, endDate, guests, setFilteredHits }) => {
  const { t } = useTranslation("stays");
  const [isLoading, setIsLoading] = useState(false);
  // const [filteredHits, setFilteredHits] = useState<PropertyType[]>([]);

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

  const handleLocalizationSelect = (localization: string) => {
    form.setValue("localization", localization);
  };

  const handleSearch = async (values: SearchValuesTypes) => {
    setIsLoading(true);

    const { localization, startEndDate, guests } = values;
    const { from, to } = startEndDate;

    const query = generateQueryString(
      {
        startDate: values?.startEndDate?.from ?? null,
        endDate: values?.startEndDate?.to ?? null
      },
      values?.guests ?? null,
      values?.localization ?? null
    );

    Router.push(`/booking?${query}`);

    try {
      const algoliaQuery = {
        query: localization,
        filters: `capacity >= ${guests}`
      }

      const searchResults = await searchClient.searchSingleIndex(
        {
          indexName: ALGOLIA_INDEX_NAME,
          searchParams: algoliaQuery
        },
      );

      const algoliaHits = searchResults.hits;

      console.log("results:", algoliaHits);

      const availableProperties = await PropertyService.filterAvailableProperties(
        algoliaHits,
        from,
        to
      );

      console.log("final ", availableProperties);
      setFilteredHits(availableProperties);
    } catch (error) {
      console.error('Erro na pesquisa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <div className="grid grid-cols-5 gap-4 items-center p-4 pb-6 shadow-lg rounded-lg bg-white mb-8 w-[916px]">

          {/* <FormInput type="text" name="localization" label={t("search.local.name")} placeholder={t("search.local.placeholder")} /> */}

          <FormField
            name="localization"
            control={form.control}
            render={({ field }) => (
              <LocalSearchInput
                label={t("search.local.name")}
                placeholder={t("search.local.placeholder")}
                onSelect={handleLocalizationSelect}
                className="w-full col-span-2"
                {...field}
              />
            )}

          />

          <DateRangePicker name="startEndDate" disabled={(date) => date < new Date()} label={t("search.startEndDate.name")} placeholder={t("search.startEndDate.placeholder")} className="w-full col-span-2" />
          <FormNumberInput name="guests" label={t("search.guests.name")} />

          <div className="items-center self-end">
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