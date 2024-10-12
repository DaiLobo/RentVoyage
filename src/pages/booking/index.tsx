import { HouseIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { InstantSearch } from "react-instantsearch";

import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/useDebounce";
import { PropertyType } from "@/interfaces/PropertyType";
import { ALGOLIA_INDEX_NAME, searchClient } from "@/lib/algolia";
import { generateQueryString, parseDate } from "@/utils/format";

import { getData } from "../api/search";

interface BookingProps {
  properties: PropertyType[] | null;
  localization: string;
  checkin: string;
  checkout: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
}

export function Booking({ properties, localization, checkin, checkout, guests, minPrice, maxPrice }: BookingProps) {
  const { t } = useTranslation("stays");
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const hasMounted = useRef(false);

  if (!properties) {
    return <div className="pt-28 px-2 grid grid-cols-1 justify-items-center w-full">
      <SearchBar setFilteredHits={() => []} localization={localization} startDate={checkin} endDate={checkout} guests={guests} />

      <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
        <HouseIcon className="justify-self-end" /> {t("not-found")}
      </div>
    </div>
  }

  const [filteredHits, setFilteredHits] = useState<PropertyType[]>(properties ?? []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {

      const fetchProperties = async () => {
        try {
          const response = await fetch(`/api/search?localization=${localization}&from=${checkin !== null ? checkin : ""}&to=${checkout !== null ? checkout : ""}&guests=${guests}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          const { hits } = await response.json();
          setFilteredHits(hits);

        } catch (error) {
          console.error('Erro ao buscar propriedades:', error);
        } finally {
          const query = generateQueryString(
            {
              startDate: parseDate(checkin),
              endDate: parseDate(checkout)
            },
            guests ?? null,
            localization ?? null,
            priceRange[0],
            priceRange[1]
          );

          Router.push(`/booking?${query}`);
        }

      };

      if (debouncedPriceRange.length) {
        fetchProperties();
      }

    }
  }, [debouncedPriceRange])

  return (
    <div className="pt-10 pb-40 px-56 grid grid-row-2 bg-[#FFFAFA] justify-items-start w-full">
      <div className="mb-16 justify-items-start items-baseline w-1/2">
        <p className="flex justify-start justify-self-start text-4xl text-slate-700">{t("stays")}</p>
      </div>

      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-1">
          <div className="mb-16 bg-white px-4">
            MAPA
          </div>

          <div className="bg-white p-4">
            <p className="text-gray-700 font-medium line-clamp-2 mb-12">Preço por diária</p>

            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
              min={0}
              max={1000}
              step={10}
            />

            <p className="text-gray-600 line-clamp-2 mt-8">R${priceRange[0]} - R${priceRange[1]}</p>
          </div>
        </div>

        <div className="col-span-2">
          <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
            <SearchBar
              setFilteredHits={setFilteredHits}
              localization={localization}
              startDate={checkin}
              endDate={checkout}
              guests={guests}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />

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
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { localization, checkin, checkout, guests, minPrice, maxPrice } = context.query;

  const q = {
    localization,
    from: checkin,
    to: checkout,
    guests: Number(guests),
    minPrice: Number(minPrice !== "" ? minPrice : "0"),
    maxPrice: Number(maxPrice)
  };

  const availableProperties = await getData(q);

  return {
    props: {
      properties: availableProperties,
      localization: localization ? localization : "",
      checkin: checkin ? checkin : "",
      checkout: checkout ? checkout : "",
      guests: guests ? guests : 0,
      minPrice: minPrice ? minPrice : 0,
      maxPrice: maxPrice ? maxPrice : 1000,
      ...(await serverSideTranslations(locale ?? "pt", ["stays", "common"]))
    }
  };
};

export default Booking;
