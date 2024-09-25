import { HouseIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { PropertyType } from "@/interfaces/PropertyType";
import { PropertyService } from "@/services/PropertyService";

interface BookingProps {
  properties: PropertyType[] | null;
  localization: string;
  checkin: string;
  checkout: string;
  guests: number;
}

export function Booking({ properties, localization, checkin, checkout, guests }: BookingProps) {
  const { t } = useTranslation("stays");

  if (!properties) {
    return <div className="pt-28 px-2 grid grid-cols-1 justify-items-center w-full">
      <SearchBar localization={localization} startDate={checkin} endDate={checkout} guests={guests} />

      <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
        <HouseIcon className="justify-self-end" /> {t("not-found")}
      </div>
    </div>
  }

  return (
    <div className="grid pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center w-full">
      <div className="mb-16 justify-items-start items-baseline w-1/2">
        <p className="flex justify-start justify-self-start text-4xl text-slate-700">{t("stays")}</p>
      </div>

      <SearchBar localization={localization} startDate={checkin} endDate={checkout} guests={guests} />

      <div className="space-y-4 ">
        {properties.map((property) => (
          <PropertyCard property={property} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { localization, checkin, checkout, guests } = context.query;

  const parsedGuests = guests ? parseInt(guests as string, 10) : null;

  // const properties = await PropertyService.getAllProperties();

  // Converte as datas para objetos Date
  const parsedCheckin = checkin ? new Date(checkin as string) : null;
  const parsedCheckout = checkout ? new Date(checkout as string) : null;

  // Chama o serviço com os parâmetros de filtro
  const propertiesFiltered = await PropertyService.getAllPropertiesFiltered({
    location: localization as string || "",
    startDate: parsedCheckin,
    endDate: parsedCheckout,
    guests: parsedGuests
  });

  return {
    props: {
      properties: propertiesFiltered,
      localization: localization ? localization : null,
      checkin: checkin ? checkin : null,
      checkout: checkout ? checkout : null,
      guests: parsedGuests,
      ...(await serverSideTranslations(locale ?? "pt", ["stays", "common"]))
    }
  };
};

export default Booking;
