import { FileIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";

import { ChatComponent } from "@/components/ChatComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReservationByUserType } from "@/interfaces/ReservationType";
import { PropertyService } from "@/services/PropertyService";
import { ReservationService } from "@/services/ReservationService";
import { parseTimeStampDate } from "@/utils/format";
import { ChatCircleText } from "@phosphor-icons/react/ChatCircleText";

interface MyBookingsProps {
  reservations: ReservationByUserType[] | null
}

export function MyBookings({ reservations }: MyBookingsProps) {
  const { t } = useTranslation("bookings");
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState("");

  const [propertyName, setPropertyName] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);

  if (!reservations) {
    return <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
      <FileIcon className="justify-self-end" /> {t("not-found")}
    </div>
  }

  const handleChat = async (reservationId: string, propertyId: string, userId: string) => {
    setIsOpen(true);
    setChatId(reservationId);
    setGuestId(userId);

    const property = await PropertyService.getProperty(propertyId);
    setPropertyName(property.name);
  }

  return (
    <>
      <div className="bg-white lg:pt-12 pt-8 lg:pb-40 pb-10 lg:px-16 px-4 grid grid-cols-1 justify-items-center w-full">
        <div className="w-full">
          <p className="flex-1 justify-start justify-self-start lg:text-4xl sm:text-3xl text-2xl text-slate-700">
            {t("bookings")}
          </p>

          <div className="relative lg:mt-12 mt-6 w-full lg:h-[275px] h-[125px] rounded-2xl overflow-hidden">
            <Image
              src="/assets/rent-voyage-banner.png"
              alt="banner"
              fill
              className="rounded-2xl"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>

          <div className="lg:mt-18 mt-6 flex flex-col gap-4">
            {
              reservations.map((reservation, index) => (
                <div
                  key={index}
                  className="flex lg:flex-row flex-col items-center p-4 bg-white shadow-md hover:shadow-xl rounded-lg w-full mb-4 cursor-pointer"
                  onClick={() => Router.push(`my-bookings/view/${reservation.id}`)}
                >
                  {reservation?.property.images &&
                    reservation?.property.images?.length > 0 &&
                    <img
                      src={reservation?.property.images[0] as unknown as string}
                      alt={reservation.property.name}
                      className="lg:w-52 w-full h-40 lg:h-52 rounded-lg object-cover"
                    />
                  }

                  <div className="lg:h-52 h-auto lg:ml-10 ml:0 lg:mt-0 mt-4 flex-1 grid lg:grid-rows-2 grid-flow-row auto-rows-max self-start w-full">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl text-slate-700 font-semibold">{reservation.property.name}</h2>
                      <p className="text-gray-500 mr-8 ">
                        {`${parseTimeStampDate(reservation.startDate)}`} - {`${parseTimeStampDate(reservation.endDate)}`} • {t("no-taxes")}
                      </p>
                    </div>


                    <div className="row-span-2">
                      <Separator className="bg-[#CACACA] mt-6 mb-4" />
                      <p className="text-[#1FC162] lg:mr-8 mr-0">{t("confirmation")}</p>
                    </div>
                  </div>

                  <div className="lg:h-52 h-auto lg:w-auto w-full lg:ml-8 ml-0 grid grid-rows-2 lg:self-start sm:justify-center items-end">
                    <div className="text-right">
                      <span className="text-xl text-slate-700 font-medium">Total</span>
                      <h2 className="text-lg font-semibold">R${reservation?.totalPrice || 0}</h2>
                    </div>

                    <Button
                      className="ml-auto px-8 gap-2 text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChat(reservation.id, reservation.propertyId, reservation.userId)
                      }}
                    >
                      {t("chat.button")} <ChatCircleText size={24} />
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">
        <ChatComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          chatId={chatId}
          propertyName={propertyName}
          guestId={guestId}
        />
      </div>
    </>
  )

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const cookies = parseCookies(context);
  const uid = cookies.uid;

  if (!uid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const reservations = await ReservationService.getReservationsByUser(uid);

  return {
    props: {
      reservations,
      ...(await serverSideTranslations(locale ?? "pt", ["bookings", "chat", "common"]))
    }
  };
};

export default MyBookings;