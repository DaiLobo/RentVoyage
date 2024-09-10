import { Minus, Plus, SearchIcon } from "lucide-react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DatePicker } from "@/components/DatePicker";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export default function Home() {
  const { t } = useTranslation("common");
  const form = useForm();
  const [guests, setGuests] = useState(0);
  const [open, setOpen] = useState(false);

  function onClick(adjustment: number) {
    setGuests(Math.max(1, Math.min(15, guests + adjustment)))
  }

  const handleSearch = async (values) => {

  };

  return (
    <div
      className="relative bg-cover bg-center h-auto"
      style={{ backgroundImage: "url('/assets/open_door.jpg')" }}
    >
      <div className="relative h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black opacity-60" />

        <div className="relative pt-28 px-24 z-10">
          <p className="text-5xl text-white">Your Journey Begins Here</p>
          <p className="mt-4 text-xl text-white w-2/6">Start your travel story with us—choose from a variety of unique properties around the world.</p>

          <Card className="mt-10 w-2/6">
            <CardHeader>
              <CardTitle>Book your stays</CardTitle>
              <CardDescription>Search for hotel, villas, chalet, apartment and more.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="grid grid-cols-1 gap-2 w-full max-w-xl" onSubmit={form.handleSubmit(handleSearch)}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1">
                      <FormInput name="Localização" label="Localização" />
                    </div>

                    <div className="grid grid-cols-2 space-y-1 gap-4">
                      <DatePicker control={form.control} disabled={(date) => date < new Date()} name="startDate" label="Check-in" placeholder="Check-in" className="w-full" />
                      <DatePicker control={form.control} name="endDate" label="Check out" placeholder="Check out" className="w-full" />
                    </div>

                    <Label className="-mb-2">Guests</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="font-normal justify-start border-slades text-muted-foreground hover:bg-terceary/[0.4] hover:text-black">
                          {guests < 1 ? "Hóspedes" : `${guests} hóspedes`}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4 px-6" align="end">

                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
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
                    </Popover>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter >
              <Button type="submit" className="gap-2 w-full">Buscar <SearchIcon /></Button>
            </CardFooter>
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
        "register"
      ]))
    }
  };
};