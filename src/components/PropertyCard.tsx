import { useTranslation } from "next-i18next";
import { useState } from "react";

import { PropertyType } from "@/interfaces/PropertyType";

import { Button } from "./ui/button";

interface PropertyCardProps {
  property: PropertyType;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { t } = useTranslation("stays");
  const [loading, setLoading] = useState(false);

  const handleSeeMore = () => {
    console.log("Abrir modal ou ir para outra página");
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


        <Button disabled={loading} className="ml-auto px-8" onClick={() => handleSeeMore()}>
          {t("reserve")}
        </Button>
      </div>

    </div>

  )
}