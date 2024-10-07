import { HouseIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch";

import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { Slider } from "@/components/ui/slider";
import { PropertyType } from "@/interfaces/PropertyType";
import { ALGOLIA_INDEX_NAME, searchClient } from "@/lib/algolia";

import { getData } from "../api/search";

interface BookingProps {
  properties: PropertyType[] | null;
  localization: string;
  checkin: string;
  checkout: string;
  guests: number;
}

export function Booking({ properties, localization, checkin, checkout, guests }: BookingProps) {
  const { t } = useTranslation("stays");
  const [priceRange, setPriceRange] = useState([100, 400]);

  if (!properties) {
    return <div className="pt-28 px-2 grid grid-cols-1 justify-items-center w-full">
      <SearchBar setFilteredHits={() => []} localization={localization} startDate={checkin} endDate={checkout} guests={guests} />

      <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
        <HouseIcon className="justify-self-end" /> {t("not-found")}
      </div>
    </div>
  }

  const [filteredHits, setFilteredHits] = useState<PropertyType[]>(properties ?? []);

  return (
    <div className="grid pt-10 pb-40 px-2 grid grid-cols-1 justify-items-center w-full">
      <div className="mb-16 justify-items-start items-baseline w-1/2">
        <p className="flex justify-start justify-self-start text-4xl text-slate-700">{t("stays")}</p>
      </div>

      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
        {/* <RangeInput attribute="price" /> */}

        <SearchBar setFilteredHits={setFilteredHits} localization={localization} startDate={checkin} endDate={checkout} guests={guests} />

        {/* <Configure hitsPerPage={10} /> 
            <Hits hitComponent={PropertyCard} />
        */}

        <div className="space-y-4 ">
          {filteredHits?.map((property) => (
            <PropertyCard hit={property} />
          ))}
        </div>


      </InstantSearch>


    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { localization, checkin, checkout, guests } = context.query;

  const parsedGuests = guests ? parseInt(guests as string, 10) : null;

  const q = {
    localization,
    from: checkin,
    to: checkout,
    guests: Number(guests),
  };
  // const properties = await PropertyService.getAllProperties();

  const availableProperties = await getData(q);

  return {
    props: {
      properties: availableProperties,
      localization: localization ? localization : "",
      checkin: checkin ? checkin : null,
      checkout: checkout ? checkout : null,
      guests: parsedGuests,
      ...(await serverSideTranslations(locale ?? "pt", ["stays", "common"]))
    }
  };
};

export default Booking;
