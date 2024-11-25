
import { differenceInCalendarDays } from "date-fns";
import { CircleDollarSign, Hotel } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { parseCookies } from "nookies";

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { ReservationByUserType } from "@/interfaces/ReservationType";
import { ReservationService } from "@/services/ReservationService";
import { formatLocalizedDate } from "@/utils/format";
import { PropertyTypeEnum } from "@/utils/list";
import { CalendarCheck } from "@phosphor-icons/react/CalendarCheck";
import { ListBullets } from "@phosphor-icons/react/ListBullets";
import { MapPinArea } from "@phosphor-icons/react/MapPinArea";

interface BookingsConfimationProps {
  reservation: ReservationByUserType | null;
}

export function BookingsConfimation({ reservation }: BookingsConfimationProps) {
  const { t } = useTranslation("stays");
  const { userAuth, userData } = useAuth();

  return (
    <div className="bg-white lg:pt-12 pt-8 pb-20 lg:px-16 px-4 grid grid-cols-1 justify-items-center w-full">
      <div className="flex flex-col gap-4 justify-items-start items-start w-full">
        <p className="lg:text-4xl sm:text-3xl text-2xl font-medium text-slate-700">{t("confirmation.congrats")}</p>
        <p className="font-medium text-sm">{userData?.name || userAuth?.displayName}, {t("confirmation.booked")}.</p>
        <Separator className="bg-[#CACACA] mt-2" />
      </div>

      <div className="flex lg:flex-row flex-col gap-8 lg:mt-10 mt-6 w-full">

        <div className="flex-1">
          <div className="mb-10 border-2 border-secondary text-sm w-72 p-5">
            {t("confirmation.receive-email")}
          </div>

          <p className="text-slate-700 text-2xl font-medium lg:mr-8 mr-0 mb-2">{reservation?.property.name}</p>

          <div>
            <div className="mt-4 flex lg:gap-4 gap-2">
              <CalendarCheck size={32} />
              <div>
                <p>{t("confirmation.initial-date")}</p>
                <p className="text-sm font-semibold">{formatLocalizedDate(reservation?.startDate ?? null)}</p>
                <p className="text-sm">12:00 - 13:30</p>
              </div>

              <Separator className="bg-[#CACACA] h-16 mx-1" orientation="vertical" />

              <div>
                <p>{t("confirmation.final-date")}</p>
                <p className="text-sm font-semibold">{formatLocalizedDate(reservation?.endDate ?? null)}</p>
                <p className="text-sm">{t("confirmation.until")} 11:00</p>
              </div>
            </div>

            <div className="mt-9 flex flex-row gap-4">
              <div className="flex flex-1 gap-4">
                <ListBullets size={32} />
                <div>
                  <p>{t("confirmation.details-booking")}</p>
                  <p className="text-sm font-semibold">
                    {reservation?.guests} {t("confirmation.person")} - {reservation?.startDate && reservation.endDate ? differenceInCalendarDays(reservation?.endDate, reservation?.startDate) : 3} {t("confirmation.daily")}, 1 {t("confirmation.room")}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 gap-4">
                <MapPinArea size={32} />
                <div>
                  <p>{t("confirmation.address")}</p>
                  <p className="text-sm font-semibold">{reservation?.property.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-row gap-4">
              <div className="flex flex-1 gap-4">
                <Hotel size={32} />
                <div>
                  <p>{t("confirmation.property-type")}</p>
                  <p className="text-sm font-semibold">
                    {reservation?.property.propertyType && PropertyTypeEnum[reservation?.property.propertyType]}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 gap-4">
                <CircleDollarSign size={32} color="#1FC162" />
                <div>
                  <p>{t("confirmation.total-value")}</p>
                  <p className="text-sm text-[#1FC162] font-semibold">R${reservation?.totalPrice.toFixed(2) || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex-1">
          <Image
            src={
              reservation?.property?.images ?
                reservation?.property?.images[0] as unknown as string :
                "/assets/beach-house-1505461_640.jpg"
            }
            alt=""
            width={550}
            height={760}
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>

  )

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const cookies = parseCookies(context);
  const uid = cookies.uid;
  const { slug } = context.params!;

  const reservation = await ReservationService.getReservationByIdWithProperty(slug as string);

  if (!uid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      reservation: reservation ?? null,
      ...(await serverSideTranslations(locale ?? "pt", ["stays", "chat", "common"]))
    }
  };
};

export default BookingsConfimation;