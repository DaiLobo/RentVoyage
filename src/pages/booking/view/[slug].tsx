import {
  ArrowLeftCircle, BedDouble, ChevronLeft, ChevronRight, CircleDollarSign, Hotel, Loader2
} from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DateRangePicker } from "@/components/DateRangePicker";
import { FormNumberInput } from "@/components/FormNumberInput";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { PropertyType } from "@/interfaces/PropertyType";
import { ReservationType } from "@/interfaces/ReservationType";
import { PropertyService } from "@/services/PropertyService";
import { ReservationService } from "@/services/ReservationService";
import { PropertyTypeEnum } from "@/utils/list";
import { MapPinArea, Star, StarHalf } from "@phosphor-icons/react";

interface BookingDetailsProps extends Omit<PropertyType, "images"> {
  images: string[];
  reservedDates: {
    startDate: string;
    endDate: string;
  }[] | null;
}

export function BookingDetails({ id, name, description, address, images, propertyType, capacity, price, reservedDates }: BookingDetailsProps) {
  const { t } = useTranslation("property");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  }

  const form = useForm({
    defaultValues: {
      startEndDate: {
        from: null,
        to: null
      },
      guests: 0
    }
  });

  // Função que desabilita as datas reservadas
  const isDateDisabled = (date: Date) => {
    if (!reservedDates) { return false }
    return reservedDates.some(
      (range) => date >= new Date(range.startDate) && date <= new Date(range?.endDate)
    );
  };

  const handleReserve = async (values: ReservationType) => {
    setLoading(true);

    try {
      const result = await ReservationService.createReservation({
        propertyId: id,
        totalPrice: price,
        ...values,
        startDate: values?.startEndDate?.from,
        endDate: values?.startEndDate?.to,
      });

      if (result) {
        showToast("success", "Reserva realizada com sucesso!");
      } else {
        showToast("error", "Erro");
      }

    } catch (error) {
      showToast("error", "Erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-row-2 bg-[#FFFAFA] pt-10 pb-40 px-32 justify-items-start w-full">
      <div className="flex flex-row gap-8 mb-16 justify-items-start items-center">
        <ArrowLeftCircle size={24} className="cursor-pointer" onClick={() => Router.back()} />

        <p className="flex justify-start justify-self-start text-2xl font-medium text-slate-700">{t("properties")}</p>
      </div>


      <div className="grid grid-cols-2 gap-8">
        <div className="w-full">
          {/* <Image src={images[0]} alt="image" width={700} height={406} className="rounded-lg" /> */}

          {/* <CarouselCustom className="w-full">
            <CarouselContentCustom className="-ml-1">
              {images.map((image, index) => (
                <CarouselItemCustom key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image src={image} alt="image" width={146} height={112} className="rounded-lg" />
                </CarouselItemCustom>
              ))}
            </CarouselContentCustom>
            <CarouselPreviousCustom />
            <CarouselNextCustom />
          </CarouselCustom> */}


          <div className="flex flex-col gap-4 w-full">
            {/* Carousel Grande */}
            <div className="relative w-full">
              <Image
                src={images[activeIndex]}
                alt={`Image ${activeIndex + 1}`}
                width={700}
                height={406}
                className="object-cover rounded-lg"
              />
              <Button
                variant="outline"
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10"
              >
                <ChevronRight />
              </Button>
            </div>

            {/* Carousel de Miniaturas */}
            <div className="flex flex-wrap gap-2 justify-between">
              {images.map((thumbnail, index) => (
                <Image
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  width={146}
                  height={112}
                  onClick={() => handleThumbnailClick(index)}
                  className={`object-cover cursor-pointer rounded-lg transition ${index === activeIndex
                    ? "ring-2 ring-primary"
                    : "opacity-60 hover:opacity-100"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col"> {/* NOME E ENDEREÇO */}
          <p className="text-3xl font-medium text-slate-900 mb-2">{name}</p>
          <div className="flex flex-row gap-2">
            <MapPinArea size={20} color="black" weight="bold" />
            <p className="text-sm text-slate-500">{address}</p>
          </div>

          <Separator className="my-3.5 bg-[#ACA2A2]" />

          <div className="flex flex-row gap-4">
            <Star size={24} weight="fill" /> {/* 1 */}
            <Star size={24} weight="fill" /> {/* 2 */}
            <Star size={24} weight="fill" /> {/* 3 */}
            <StarHalf size={24} weight="fill" /> {/* 4 */}
            <Star size={24} /> {/* 5 */}

            <p className="text-lg font-medium">1.445 {t("reviews")}</p>
          </div>

          {/* DESCRIÇÃO */}
          <div className="flex flex-col mt-6 mb-8 gap-2">
            <p className="text-xl font-medium">{t("description.name")}</p>

            <p>{description}</p>
          </div>

          {/* Características de propriedade */}
          <div className="flex flex-row flex-1 gap-2 justify-between mb-7">
            <div className="flex gap-2">
              <Hotel size={24} />
              {/* @ts-ignore */}
              <p className="text-base">{PropertyTypeEnum[propertyType]}</p>
            </div>

            <div className="flex gap-2">
              <BedDouble size={24} />
              <p className="text-base">{capacity} {t("person")}</p>
            </div>

            <div className="flex gap-2">
              <CircleDollarSign size={24} color="#1FC162" />
              <p className="text-base text-[#1FC162]">R${price.toFixed(2)}</p>
            </div>
          </div>

          {/* BOOK FORM */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleReserve)}>
              <div className="bg-[#F3F4F8] rounded-lg p-4">
                <div className="flex gap-1 items-center justify-center mb-5">
                  <p className="font-medium">{t("search.total-price")}</p>
                  <p className="text-lg font-medium"> R${price} </p>
                </div>

                <div className="grid grid-row-2 gap-4">
                  <div className="flex gap-12 mb-4">
                    <DateRangePicker name="startEndDate" disabled={(date) => date < new Date()} label={t("startEndDate.name")} placeholder={t("startEndDate.placeholder")} className="w-full col-span-2" />
                    <FormNumberInput name="guests" label={t("search.guests.name")} max={capacity} />
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


      {/* {
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

      </div> */}
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
