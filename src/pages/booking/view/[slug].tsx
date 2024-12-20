import { differenceInCalendarDays, isSameDay } from "date-fns";
import { ArrowLeftCircle, BedDouble, CircleDollarSign, Hotel, Loader2 } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { CarouselResponsive } from "@/components/CarouselResponsive";
import { CarouselThumbsGallery } from "@/components/CarouselThumbsGallery";
import { DateRangePicker } from "@/components/DateRangePicker";
import { FormNumberInput } from "@/components/FormNumberInput";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { PropertyType } from "@/interfaces/PropertyType";
import { ReservationFormType } from "@/interfaces/ReservationType";
import { PropertyService } from "@/services/PropertyService";
import { ReservationService } from "@/services/ReservationService";
import { PropertyTypeEnum } from "@/utils/list";
import { useFormReservation } from "@/validations/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinArea } from "@phosphor-icons/react/MapPinArea";
import { Star } from "@phosphor-icons/react/Star";
import { StarHalf } from "@phosphor-icons/react/StarHalf";

interface BookingDetailsProps extends Omit<PropertyType, "images"> {
  images: string[];
  reservedDates: {
    startDate: string;
    endDate: string;
  }[] | null;
}

export function BookingDetails({ id, name, description, address, images, propertyType, capacity, price, reservedDates }: BookingDetailsProps) {
  const { t } = useTranslation("property");
  const reservation = useFormReservation();
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);

  const form = useForm({
    resolver: zodResolver(reservation),
    defaultValues: {
      startEndDate: {
        from: null,
        to: null
      },
      guests: 0
    }
  });

  const dates = form.watch("startEndDate");

  // Função que desabilita as datas reservadas
  const isDateDisabled = (date: Date) => {
    if (!reservedDates) { return false }
    return reservedDates.some(
      (range) => date >= new Date(range.startDate) && date <= new Date(range?.endDate)
    );
  };

  const handleReserve = async (values: ReservationFormType) => {
    setLoading(true);

    if (!id) return;
    if (!values.startEndDate?.from || !values.startEndDate?.to) {
      return
    }

    try {
      if (values.startEndDate?.from && values.startEndDate?.to) {
        if (isSameDay(values.startEndDate.from, values.startEndDate.to)) {
          showToast("info", t("same-dates"));
          return;
        }
      }

      const result = await ReservationService.createReservation({
        propertyId: id,
        startDate: values?.startEndDate?.from,
        endDate: values?.startEndDate?.to,
        guests: values?.guests,
        totalPrice: totalPrice
      }, name, propertyType);

      if (result) {
        showToast("success", "Reserva realizada com sucesso!");
        Router.push(`/booking/confirmation/${result}`);
      } else {
        showToast("error", "Erro ao realizar a reserva");
      }

    } catch (error) {
      showToast("error", "Erro ao realizar a reserva");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (dates.to && dates.from) {
      setTotalPrice(differenceInCalendarDays(dates.to, dates.from) * price);
    }
  }, [dates])

  return (
    <div className="grid grid-row-2 bg-[#FFFAFA] lg:pt-12 pt-8 pb-20 lg:px-16 px-4 justify-items-start w-full">
      <div className="flex flex-row gap-4 lg:mb-12 mb-6 justify-items-start items-center">
        <ArrowLeftCircle size={24} className="cursor-pointer" onClick={() => Router.back()} />

        <p className="flex justify-start justify-self-start lg:text-2xl text-lg font-medium text-slate-700">{t("properties")}</p>
      </div>

      <div className="grid lg:grid-cols-2 flex md:gap-8 gap-6">
        <div className="w-full hidden lg:block">
          <CarouselThumbsGallery images={images} />
        </div>

        <div className="flex flex-col"> {/* NOME E ENDEREÇO */}
          <p className="lg:text-3xl sm:text-2xl text-xl font-medium text-slate-900 mb-2">{name}</p>
          <div className="flex flex-row gap-2">
            <MapPinArea size={20} color="black" weight="bold" />
            <p className="text-sm text-slate-500">{address}</p>
          </div>

          <Separator className="my-3.5 bg-[#CACACA]" />

          <div className="flex flex-row gap-4">
            <Star size={24} weight="fill" className="lg:w-6 w-5 h-5 lg:h-6" /> {/* 1 */}
            <Star size={24} weight="fill" className="lg:w-6 w-5 h-5 lg:h-6" /> {/* 2 */}
            <Star size={24} weight="fill" className="lg:w-6 w-5 h-5 lg:h-6" /> {/* 3 */}
            <StarHalf size={24} weight="fill" className="lg:w-6 w-5 h-5 lg:h-6" /> {/* 4 */}
            <Star size={24} className="lg:w-6 w-5 h-5 lg:h-6" /> {/* 5 */}

            <p className="lg:text-lg text-md font-medium">1.445 {t("reviews")}</p>
          </div>

          <div className="mt-8 block lg:hidden">
            <CarouselResponsive images={images} />
          </div>

          {/* DESCRIÇÃO */}
          <div className="flex flex-col mt-6 mb-6 gap-2">
            <p className="text-xl font-medium">{t("description.name")}</p>

            <p>{description}</p>
          </div>

          {/* Características de propriedade */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Hotel size={24} />
              <p className="text-base">{PropertyTypeEnum[propertyType]}</p>
            </div>

            <div className="flex items-center gap-2">
              <BedDouble size={24} />
              <p className="text-base">{capacity} {t("person")}</p>
            </div>

            <div className="flex items-center gap-2">
              <CircleDollarSign size={24} color="#1FC162" />
              <p className="text-base text-[#1FC162]">R${price.toFixed(2)}</p>
            </div>
          </div>


          {/* BOOK FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleReserve)} className="flex-1 content-end">
              <div className="bg-[#F3F4F8] rounded-lg p-4">
                <div className="flex gap-1 items-center justify-center mb-5">
                  <p className="font-medium">{t("search.total-price")}</p>
                  <p className="text-lg font-medium">
                    R${dates?.to && dates?.from ?
                      (differenceInCalendarDays(dates.to, dates.from) * price)
                      : price}
                  </p>
                </div>

                <div className="grid grid-row-2 gap-4">
                  <div className="flex sm:flex-row flex-col sm:gap-12 gap-4 sm:mb-4 mb-2">
                    <DateRangePicker name="startEndDate" disabled={(date) => date < new Date() || isDateDisabled(date)} label={t("startEndDate.name")} placeholder={t("startEndDate.placeholder")} className="w-full col-span-2" />
                    <FormNumberInput name="guests" label={t("search.guests.name")} max={capacity} className="sm:self-auto self-start" />
                  </div>

                  <Button type="submit" disabled={loading} className="w-44 justify-self-center">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />}
                    {t("search.title")}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

      </div>
    </div >

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { slug } = context.params!;

  const property = await PropertyService.getProperty(slug as string);

  const reservedDates = await ReservationService.getReservedDates(slug as string);

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
