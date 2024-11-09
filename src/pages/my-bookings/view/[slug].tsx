import { ArrowLeftCircle } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { parseCookies } from "nookies";

import { Separator } from "@/components/ui/separator";
import { ReservationByUserType } from "@/interfaces/ReservationType";
import { CalendarCheck, ListBullets, MapPinArea, Star, StarHalf } from "@phosphor-icons/react";
import Image from "next/image";

interface MyBookingsViewProps {
  reservation: ReservationByUserType | null;
}

export function MyBookingsView({ reservation }: MyBookingsViewProps) {
  const { t } = useTranslation("bookings");

  return (
    <div className="bg-white lg:pt-16 pt-8 pb-20 lg:px-16 px-4 grid grid-cols-1 justify-items-center w-full">
      <div className="flex flex-row gap-4 justify-items-start items-center w-full">
        <ArrowLeftCircle size={28} className="cursor-pointer" onClick={() => Router.push("/my-properties")} />
        <p className="flex-1 justify-start justify-self-start lg:text-2xl text-xl text-slate-800 font-medium">
          {t("back-list-bookings")}
        </p>
      </div>

      <div className="flex lg:flex-row flex-col gap-8 lg:mt-10 mt-6 w-full">
        <div className="flex-1 justify-self-start">
          <p className="text-[#1FC162] text-sm font-medium lg:mr-8 mr-0 mb-2">{t("confirmation")}</p>

          <div className="flex lg:flex-row flex-col items-baseline lg:gap-4 gap-2">
            <p className="lg:text-4xl sm:text-3xl text-2xl font-medium text-slate-700">Mediterranean Villa{reservation?.property.name}</p>
            <div className="flex flex-row gap-4">
              <Star size={20} weight="fill" /> {/* 1 */}
              <Star size={20} weight="fill" /> {/* 2 */}
              <Star size={20} weight="fill" /> {/* 3 */}
              <StarHalf size={20} weight="fill" /> {/* 4 */}
              <Star size={20} /> {/* 5 */}
            </div>
          </div>

          <div className="mt-9 flex lg:gap-4 gap-2">
            <CalendarCheck size={32} />
            <div>
              <p>{t("initial-date")}</p>
              <p className="text-sm font-semibold">dom., 2 de fev. de 2025</p>
              <p className="text-sm">12:00 - 13:30</p>
            </div>

            <Separator className="bg-[#CACACA] h-16 mx-1" orientation="vertical" />

            <div>
              <p>{t("final-date")}</p>
              <p className="text-sm font-semibold">qua., 5 de fev. de 2025</p>
              <p className="text-sm">até as 11:00</p>
            </div>
          </div>

          <div className="mt-9 flex flex-row lg:gap-16 gap-4">
            <div className="flex flex-1 gap-4">
              <ListBullets size={32} />
              <div>
                <p>{t("details-booking")}</p>
                <p className="text-sm font-semibold">2 adultos - 3 diárias, 1 quarto</p>
              </div>
            </div>

            <div className="flex flex-1 gap-4">
              <MapPinArea size={32} />
              <div>
                <p>{t("address")}</p>
                <p className="text-sm font-semibold">{reservation?.property.address} Rua teste, nº 70</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-10 border-2 border-[#1FC162] bg-[#A0CFB3]/[0.5] font-sm w-80 p-5">
            <p>{t("number")} <span className="font-semibold">989956233222</span></p>
            <p>{t("guest-name")} <span className="font-semibold">Bibi Park</span></p>
            <p>{t("total-price")} <span className="font-semibold">R$ 1.051</span></p>
          </div>

          <Image
            src="/assets/beach-house-1505461_640.jpg"
            alt=""
            width={350}
            height={560}
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

  // const property = await PropertyService.getProperty(slug as string);
  const reservation = null;

  if (!uid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // if (!reservation) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      reservations: reservation ?? null,
      ...(await serverSideTranslations(locale ?? "pt", ["property", "bookings", "chat", "common"]))
    }
  };
};

export default MyBookingsView;