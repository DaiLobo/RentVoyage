import { ArrowLeftCircle, Minus, Plus } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";

import { DatePicker } from "@/components/DatePicker";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PropertyType } from "@/interfaces/PropertyType";
import { ReservationType } from "@/interfaces/ReservationType";
import { PropertyService } from "@/services/PropertyService";
import { ReservationService } from "@/services/ReservationService";
import { PropertyTypeEnum } from "@/utils/list";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface BookingDetailsProps extends Omit<PropertyType, "images"> {
  images: string[] | null;
  reservedDates: {
    startDate: string;
    endDate: string;
  }[] | null;
}

export function BookingDetails({ id, name, description, address, images, propertyType, capacity, price, reservedDates }: BookingDetailsProps) {
  const { t } = useTranslation("property");
  const [loading, setLoading] = useState(false);
  const [updateGuests, setUpdateGuests] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      numberGuest: 1
    }
  });

  function handleNumberGuests(adjustment: number) {
    setUpdateGuests(Math.max(1, Math.min(capacity, updateGuests + adjustment)))
  }

  // Função que desabilita as datas reservadas
  const isDateDisabled = (date: Date) => {
    if (!reservedDates) { return false }
    return reservedDates.some(
      (range) => date >= new Date(range.startDate) && date <= new Date(range?.endDate)
    );
  };

  const handleReserve = async (values: ReservationType) => {
    console.log(id, price, updateGuests, values)
    setLoading(true);
    try {
      const result = await ReservationService.createReservation({
        propertyId: id,
        totalPrice: price,
        ...values,
        numberGuest: updateGuests,
      });

      if (result) {
        showToast("success", "Reserva realizada com sucesso!");
      } else {
        showToast("error", "Erro");
      }

      setLoading(false);
    } catch (error) {
      showToast("error", "Erro");
      setLoading(false);
    }
  }

  return (
    <div className="grid pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <div className="flex flex-row gap-8 mb-16 justify-items-start items-baseline w-1/2">
        <ArrowLeftCircle size={28} className="cursor-pointer" onClick={() => Router.back()} />

        <p className="flex justify-start justify-self-start text-4xl text-slate-700">{name}</p>
      </div>

      {
        images && images?.length > 0 ?
          <Carousel opts={{
            align: "start",
          }}
            className="w-full max-w-4xl">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Image src={image} alt="" width={650} height={650} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-bgcolor" />
            <CarouselNext className="bg-bgcolor" />
          </Carousel>
          : null
      }

      <div className="grid grid-row-4 w-1/2 mt-12 mx-32 gap-2">
        {price ? <div className="flex flex-row gap-1 text-lg justify-end pr-6">
          <p className="font-semibold">{t("price.name")}:</p> R${price?.toFixed(2)}
        </div> : null}

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-lg">{t("description.name")}: </TableCell>
              <TableCell className="text-lg">{description}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell />
              {/* @ts-ignore */}
              <TableCell className="text-lg">Tipo da propriedade: {PropertyTypeEnum[propertyType]}</TableCell>
              <TableCell className="text-lg">Acomoda: {capacity} {t("person")}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-semibold text-lg">{t("address.name")}: </TableCell>
              <TableCell className="text-lg">{address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleReserve)} className="grid">

            <div className="grid grid-row-3 gap-4 items-center p-4 pb-6 shadow-lg rounded-lg bg-white mt-8 w-1/2 justify-self-center">

              <div className="grid grid-cols-2 gap-4">
                <DatePicker disabled={(date) => date < new Date() || isDateDisabled(date)} name="startDate" label="Check-in" placeholder="Check-in" className="self-end" />
                <DatePicker disabled={(date) => date < new Date() || isDateDisabled(date)} name="endDate" label="Check-out" placeholder="Check-out" className="self-end" />
              </div>

              <div className="flex flex-col gap-2 self-end">
                <Label>Guests</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="font-normal bg-white justify-start border-slades text-muted-foreground hover:bg-terceary/[0.4] hover:text-black w-full">
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
                        disabled={updateGuests >= capacity}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Button disabled={loading} type="submit" className="mt-4 w-1/2 justify-self-center">{t("search.title")}</Button>
            </div>
          </form>
        </Form>

      </div>
    </div>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { slug } = context.params!;

  const property = await PropertyService.getProperty(slug as string);

  const reservedDates = await ReservationService.getReservedDates(slug as string);
  console.log(new Date(reservedDates[1].startDate))

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: slug,
      reservedDates,
      ...property,
      ...(await serverSideTranslations(locale ?? "pt", ["property", "common"]))
    }
  };
};

export default BookingDetails;
