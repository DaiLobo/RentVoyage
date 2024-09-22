import { Loader2, SearchIcon } from "lucide-react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DateRangePicker } from "@/components/DateRangePicker";
import { FormInput } from "@/components/FormInput";
import { FormNumberInput } from "@/components/FormNumberInput";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SearchValuesTypes } from "@/interfaces/SearchType";
import { generateQueryString } from "@/utils/format";

export default function Home() {
  const { t } = useTranslation("home");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      localization: "",
      startDate: null,
      endDate: null,
      guests: 0,
    }
  });

  const handleSearch = (values: SearchValuesTypes) => {
    setLoading(true);
    console.log(values)
    const query = generateQueryString(
      {
        // startDate: values?.startDate,
        // endDate: values?.endDate
        startDate: values?.startEndDate.from,
        endDate: values?.startEndDate.to
      },
      values?.guests ?? null,
      values?.localization ?? null
    );

    Router.push(`/booking?${query}`);
  };

  return (
    <div
      className="relative bg-cover bg-center h-auto"
      style={{ backgroundImage: "url('/assets/open_door.jpg')" }}
    >
      <div className="relative h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black opacity-60" />

        <div className="relative pt-24 px-24 z-10">
          <p className="text-5xl text-white">{t("title")}</p>
          <p className="mt-4 text-xl text-white w-2/6">{t("text")}</p>

          <Card className="mt-10 w-fit shadow-lg">
            <CardHeader>
              <CardTitle>{t("form.title")}</CardTitle>
              <CardDescription>{t("form.description")}</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form className="grid grid-cols-1 gap-2 w-full max-w-xl" onSubmit={form.handleSubmit(handleSearch)}>
                <CardContent>
                  <div className="grid w-full items-center gap-6">
                    <div className="flex flex-col space-y-1">
                      <FormInput type="text" name="localization" label={t("form.local.name")} placeholder={t("form.local.placeholder")} />
                    </div>

                    <div className="grid grid-cols-3 gap-6 justify-items-end">
                      <DateRangePicker name="startEndDate" disabled={(date) => date < new Date()} label={t("form.startEndDate.name")} placeholder={t("form.startEndDate.placeholder")} className="w-full col-span-2" />
                      <FormNumberInput name="guests" label={t("form.guests.name")} />
                    </div>

                    {/* <div className="grid grid-cols-2 space-y-1 gap-4">
                      <DatePicker disabled={(date) => date < new Date()} name="startDate" label="Check-in" placeholder="Check-in" className="w-full" />
                      <DatePicker disabled={(date) => date < new Date()} name="endDate" label="Check out" placeholder="Check out" className="w-full" />
                    </div> */}


                    {/* <Label className="-mb-2">{t("form.guests.name")}</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="outline" className="font-normal justify-start border-slades text-muted-foreground hover:bg-terceary/[0.4] hover:text-black">
                          {guests < 1 ? t("form.guests.name") : `${guests} ${t("form.guests.placeholder")}`}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4 px-6" align="end">

                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 shrink-0 rounded-full p-0"
                              onClick={() => onClick(-1)}
                              disabled={guests <= 1}
                            >
                              <Minus className="h-4 w-4" />
                              <span className="sr-only">Decrease</span>
                            </Button>

                            <div className="text-md font-bold tracking-tighter px-2">
                              {guests}
                            </div>

                            <Button
                              variant="outline"
                              size="icon"
                              type="button"
                              className="h-6 w-6 shrink-0 rounded-full p-0"
                              onClick={() => onClick(1)}
                              disabled={guests >= 15}
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Increase</span>
                            </Button>
                          </div>
                        </div>

                      </PopoverContent>
                    </Popover> */}
                  </div>
                </CardContent>
                <CardFooter >
                  <Button type="submit" className="gap-2 w-full" disabled={loading}>
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />
                    )}
                    {t("form.search")} <SearchIcon />
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

      </div>

      {/* <Image src="/assets/paronamic.jpg" alt="" width={200} height={200} /> */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", [
        "common",
        "login",
        "register",
        "home"
      ]))
    }
  };
};