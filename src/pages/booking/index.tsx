import { HouseIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { PropertyType } from "@/interfaces/PropertyType";
import { ReservationType } from "@/interfaces/ReservationType";
import { PropertyService } from "@/services/PropertyService";
import { ReservationService } from "@/services/ReservationService";
import { SearchBar } from "@/components/SearchBar";

interface BookingProps {
  properties: PropertyType[] | null;
  checkin: string;
  checkout: string;
  guests: number;
}

export function Booking({ properties, checkin, checkout, guests }: BookingProps) {
  const { t } = useTranslation("stays");
  const [loading, setLoading] = useState(false);

  if (!properties) {
    return <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
      <HouseIcon className="justify-self-end" /> {t("not-found")}
    </div>
  }

  const handleReserve = async (values: ReservationType) => {
    try {
      const result = await ReservationService.createReservation(values);

      if (result) {
        showToast("success", t("message.success"));
      } else {
        showToast("error", t("message.error"));
      }

      setLoading(false);
    } catch (error) {
      showToast("error", t("message.error"));
      setLoading(false);
    }
  }

  return (
    <div className="grid pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <div className="mb-16 justify-items-start items-baseline w-1/2">
        <p className="flex justify-start justify-self-start text-4xl text-slate-700">{t("stays")}</p>
      </div>

      <SearchBar localization="" startDate={checkin} endDate={checkout} guests={guests} />

      <div className="space-y-4 ">
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex items-center p-4 bg-white shadow-lg rounded-lg w-[916px]"
          >
            {property.images &&
              property.images?.length > 0 &&
              <img
                src={property?.images[0] as unknown as string}
                alt={property.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
            }
            <div className="ml-4 flex-1">
              <h2 className="text-xl font-semibold">{property.name}</h2>
              <p className="text-gray-500 mr-8">{property.address}</p>
              <p className="text-gray-500 mr-8">Quantidade de reservas: {property?.reservations?.length ?? 0}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-right">
                <span className="text-md font-normal">Total</span>
                <h2 className="text-lg font-semibold">R${property?.price?.toFixed(2) ?? 0}</h2>
              </div>


              <Button disabled={loading} className="ml-auto px-8" onClick={() => handleReserve({
                propertyId: property.id,
                startDate: checkin,
                endDate: checkout,
                totalPrice: property.price,
                numberGuest: guests,
              })}>
                {t("reserve")}
              </Button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { checkin, checkout, guests } = context.query;

  const parsedGuests = guests ? parseInt(guests as string, 10) : null;
  const properties = await PropertyService.getAllProperties();

  return {
    props: {
      properties,
      checkin: checkin ? checkin : null,
      checkout: checkout ? checkout : null,
      guests: parsedGuests,
      ...(await serverSideTranslations(locale ?? "pt", ["stays", "common"]))
    }
  };
};

export default Booking;
