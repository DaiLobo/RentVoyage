import { useTranslation } from "next-i18next";
import Router from "next/router";

import { PropertyType } from "@/interfaces/PropertyType";

import { showToast } from "./Toast";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface PropertyCardProps {
  property: PropertyType;
}

export const PropertyCard = ({ hit }: { hit: PropertyType }) => {
  const { t } = useTranslation("stays");

  const handleSeeMore = () => {
    if (hit.objectID || hit.id) {
      Router.push(`/booking/view/${hit.objectID || hit.id}`);
    } else {
      showToast("error", t("search.error-generic"));
    }
  }

  return (
    <div
      key={hit.objectID}
      className="flex items-center p-4 bg-white shadow-lg rounded-lg w-[916px] mb-4"
    >
      {hit.images &&
        hit.images?.length > 0 &&
        <img
          src={hit?.images[0] as unknown as string}
          alt={hit.name}
          className="w-36 h-36 rounded-lg object-cover"
        />
      }
      <div className="ml-4 flex-1">
        <h2 className="text-xl font-semibold">{hit.name}</h2>
        <p className="text-gray-500 mr-8">{hit.address}</p>
        <Separator className="my-4" />
        <p className="text-gray-500 mr-8 line-clamp-2">{hit.description}</p>
      </div>

      <div className="flex flex-col gap-4 ml-8 self-end">
        <div className="text-right">
          <span className="text-md font-normal">Total</span>
          <h2 className="text-lg font-semibold">R${hit?.price?.toFixed(2) ?? 0}</h2>
        </div>


        <Button className="ml-auto px-8" onClick={() => handleSeeMore()}>
          {t("search.details")}
        </Button>
      </div>

    </div>

  )
}