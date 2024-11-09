import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { ArrowLeftCircle, BedDouble, CircleDollarSign, Hotel } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ChatComponent } from "@/components/ChatComponent";
import MapPropertyComponent from "@/components/MapPropertyComponent";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PropertyType } from "@/interfaces/PropertyType";
import { ReservationType } from "@/interfaces/ReservationType";
import { PropertyService } from "@/services/PropertyService";
import { ReservationService } from "@/services/ReservationService";
import { parseTimeStampDate } from "@/utils/format";
import { PropertyTypeEnum } from "@/utils/list";
import { BookBookmark, ChatCircleText, MapPinArea, Star, StarHalf } from "@phosphor-icons/react";

interface PropertyViewProps extends Omit<PropertyType, "images"> {
  images: string[] | null;
  reservations?: ReservationType[];
}

export function PropertyView({ name, description, address, images, propertyType, capacity, price, reservations }: PropertyViewProps) {
  const { t } = useTranslation("property");
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState("");
  const [guest, setGuest] = useState({
    userId: "",
    userName: ""
  });

  // CHAT
  const handleViewChat = async (reservationId: string, userId: string, userName: string) => {
    setIsOpen(true);
    setChatId(reservationId ?? "");
    setGuest({
      userId,
      userName
    });
  }

  return (
    <div className="bg-white lg:pt-12 pt-8 pb-20 lg:px-16 px-4 grid grid-cols-1 justify-items-center w-full">
      <div className="flex flex-row gap-4 lg:mb-12 mb-4 justify-items-start items-center w-full">
        <ArrowLeftCircle size={28} className="cursor-pointer" onClick={() => Router.push("/my-properties")} />
        <p className="flex-1 justify-start justify-self-start lg:text-2xl text-xl text-slate-700 font-medium">
          {t("back-list-property")}
        </p>
      </div>

      {
        images && images?.length > 0 ?
          <div className="w-full h-max lg:my-10 my-4">
            <>
              <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                modules={[FreeMode, Pagination]}
                className="lg:w-[700px] w-auto lg:h-[400px] h-[200px]"
              >
                {
                  images.map((image, index) => (
                    <SwiperSlide key={index} className="w-full h-full">
                      <Image src={image} alt={`Image ${index}`} width={1200} height={820} className="rounded-lg" />
                    </SwiperSlide>))
                }
              </Swiper>
            </>
          </div>
          : null
      }

      <Separator className="bg-[#CACACA] mt-2" />

      <div className="flex lg:flex-row flex-col gap-8 mt-6 lg:mb-8 mb-4">
        {/* Detalhes da propriedade */}
        <div className="flex-1 justify-self-start">
          <div className="flex lg:flex-row flex-col items-baseline lg:gap-4 gap-2">
            <p className="lg:text-4xl sm:text-3xl text-2xl font-medium text-slate-700">{name}</p>
            <div className="flex flex-row gap-4">
              <Star size={20} weight="fill" /> {/* 1 */}
              <Star size={20} weight="fill" /> {/* 2 */}
              <Star size={20} weight="fill" /> {/* 3 */}
              <StarHalf size={20} weight="fill" /> {/* 4 */}
              <Star size={20} /> {/* 5 */}

              <p className="text-lg font-medium">1.445 {t("reviews")}</p>
            </div>
          </div>

          <div className="flex flex-row gap-2 lg:mt-4 mt-2">
            <MapPinArea size={20} color="black" weight="bold" />
            <p className="text-sm text-slate-500">{address}</p>
          </div>


          {/* DESCRIÇÃO */}
          <div className="flex flex-col mt-7 mb-8 gap-2">
            <p className="text-xl font-medium">{t("description.name")}</p>

            <p>{description}</p>
          </div>

          {/* Características de propriedade */}
          <div className="flex flex-row flex-1 gap-2 justify-between">
            <div className="flex gap-2">
              <Hotel size={24} />
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
        </div>

        {/* Mapa da propriedade */}
        <div className="bg-white rounded flex-1">
          <MapPropertyComponent address={address} />
        </div>
      </div>

      <Separator className="bg-[#CACACA]" />

      {/* Reservas da propriedade */}
      <div className="flex-1 justify-self-start mt-6 w-full">
        <div className="flex flex-row items-end gap-4">
          <p className="lg:text-4xl sm:text-3xl text-2xl font-medium text-slate-700">{t("bookings.title")}</p>
          <BookBookmark size={32} />
        </div>

        <Table className="mt-7">
          <TableHeader>
            <TableRow className="text-xl bg-gray-100">
              <TableHead className="min-w-[180px]">{t("bookings.number")}</TableHead>
              <TableHead>{t("bookings.guest")}</TableHead>
              <TableHead className="flex items-center justify-center min-w-[180px]">{t("bookings.qnt-guests")}</TableHead>
              <TableHead>{t("bookings.date")}</TableHead>
              <TableHead className="text-right">{t("bookings.price")}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {!reservations?.length ?
              t("bookings.not-found")
              :
              reservations?.map((reservation) => (
                <TableRow className="text-base">
                  <TableCell className="font-medium">{reservation.id.substring(0, 8)}</TableCell>
                  <TableCell>{reservation.userName}</TableCell>
                  <TableCell className="flex items-center justify-center">{reservation.guests}</TableCell>
                  <TableCell className="min-w-[400px]">{`${parseTimeStampDate(reservation.startDate)}`} - {`${parseTimeStampDate(reservation.endDate)}`}</TableCell>
                  <TableCell className="text-right">R${reservation?.totalPrice.toFixed(2)}</TableCell>
                  <TableCell className="flex justify-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ChatCircleText size={32} onClick={() => handleViewChat(reservation.id, reservation.userId, reservation.userName || "Convidado")} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("chat")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>

      <div className="absolute bottom-0 right-0">
        <ChatComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          chatId={chatId}
          guestId={guest.userId}
          guestName={guest.userName}
        />
      </div>
    </div>
  )

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const cookies = parseCookies(context);
  const uid = cookies.uid;
  const { slug } = context.params!;

  const property = await PropertyService.getProperty(slug as string);
  const reservations = await ReservationService.getReservationsByPropertyId(slug as string);

  if (!uid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...property,
      reservations: reservations ?? [],
      ...(await serverSideTranslations(locale ?? "pt", ["property", "chat", "common"]))
    }
  };
};

export default PropertyView;