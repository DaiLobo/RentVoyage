import { useTranslation } from "next-i18next";
import Router from "next/router";

import { PropertyType } from "@/interfaces/PropertyType";

import { showToast } from "./Toast";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface PropertyCardProps {
  property: PropertyType;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { t } = useTranslation("stays");

  const handleSeeMore = () => {
    if (property.id) {
      Router.push(`/booking/view/${property.id}`);
    } else {
      showToast("error", t("error-generic"));
    }
  }

  return (
    <div
      key={property.id}
      className="flex items-center p-4 bg-white shadow-lg rounded-lg w-[916px]"
    >
      {property.images &&
        property.images?.length > 0 &&
        <img
          src={property?.images[0] as unknown as string}
          alt={property.name}
          className="w-36 h-36 rounded-lg object-cover"
        />
      }
      <div className="ml-4 flex-1">
        <h2 className="text-xl font-semibold">{property.name}</h2>
        <p className="text-gray-500 mr-8">{property.address}</p>
        <Separator className="my-4" />
        <p className="text-gray-500 mr-8 line-clamp-2">{property.description}</p>
        <p className="text-gray-500 mr-8">Quantidade de reservas: {property?.reservations?.length ?? 0}</p>
      </div>

      <div className="flex flex-col gap-4 ml-8 self-end">
        <div className="text-right">
          <span className="text-md font-normal">Total</span>
          <h2 className="text-lg font-semibold">R${property?.price?.toFixed(2) ?? 0}</h2>
        </div>


        <Button className="ml-auto px-8" onClick={() => handleSeeMore()}>
          {t("search.details")}
        </Button>
      </div>

    </div>

  )
}