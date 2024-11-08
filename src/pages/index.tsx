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
      startEndDate: {
        from: null,
        to: null
      },
      guests: 0,
    }
  });

  const handleSearch = (values: SearchValuesTypes) => {
    setLoading(true);

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
    <div
      className="relative bg-cover bg-center h-auto"
      style={{ backgroundImage: "url('/assets/open_door.jpg')" }}
    >
      <div className="flex relative max-[340px]:h-[110vh] sm:h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black opacity-60" />

        <div className="relative py-6 sm:py-0 lg:px-16 px-4 z-10 content-center">
          <p className="lg:text-4xl sm:text-3xl text-2xl text-white">{t("title")}</p>
          <p className="mt-2 lg:text-xl text-sm text-white sm:w-1/2 w-full">{t("text")}</p>

          <Card className="lg:mt-10 mt-4 w-fit shadow-lg">
            <CardHeader>
              <CardTitle>{t("form.title")}</CardTitle>
              <CardDescription>{t("form.description")}</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form className="grid grid-cols-1 gap-2 w-full max-w-xl" onSubmit={form.handleSubmit(handleSearch)}>
                <CardContent>
                  <div className="grid w-full items-center lg:gap-6 gap-4">
                    <FormInput
                      type="text"
                      name="localization"
                      label={t("form.local.name")}
                      placeholder={t("form.local.placeholder")}
                      className="w-full"
                    />

                    <div className="grid lg:grid-cols-3 grid-cols-1 grid-row-2 lg:gap-x-6 gap-x-0 lg:gap-y-6 gap-y-4 lg:justify-items-end justify-items-start">
                      <DateRangePicker
                        name="startEndDate"
                        disabled={(date) => date < new Date()} label={t("form.startEndDate.name")}
                        placeholder={t("form.startEndDate.placeholder")}
                        className="w-full col-span-2" />

                      <FormNumberInput name="guests" label={t("form.guests.name")} />
                    </div>

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