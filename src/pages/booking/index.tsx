import { HouseIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { InstantSearch } from "react-instantsearch";

import { FilterModal } from "@/components/FilterModal";
import MapComponent from "@/components/MapComponent";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/useDebounce";
import { PropertyType } from "@/interfaces/PropertyType";
import { ALGOLIA_INDEX_NAME, searchClient } from "@/lib/algolia";
import { generateQueryString, parseDate } from "@/utils/format";
import { Coins, MapTrifold } from "@phosphor-icons/react";

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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const hasMounted = useRef(false);

  const [filteredHits, setFilteredHits] = useState<PropertyType[]>([]);

  useEffect(() => {
    setFilteredHits(properties ?? []);
  }, [properties]);

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

          Router.push(`/booking?${query}`, undefined, { scroll: false });
        }

      };

      if (debouncedPriceRange.length) {
        fetchProperties();
      }

    }
  }, [debouncedPriceRange])

  if (!properties?.length) {
    return <div className="pt-28 lg:px-16 px-4 grid grid-cols-1 justify-items-center w-full">
      <SearchBar setFilteredHits={() => []} localization={localization} startDate={checkin} endDate={checkout} guests={guests} />

      <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
        <HouseIcon className="justify-self-end" /> {t("not-found")}
      </div>
    </div>
  }

  return (
    <div className="pt-8 pb-20 lg:px-16 px-4 grid grid-row-3 bg-[#FFFAFA] justify-items-start w-full">
      <div className="lg:mb-16 mb-8 justify-items-start items-baseline">
        <p className="flex justify-start justify-self-start lg:text-4xl sm:text-3xl text-2xl text-slate-700">{t("stays")}</p>
      </div>

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

        <div className="grid lg:grid-cols-3 flex md:gap-8 gap-6 w-full">
          <div className="flex flex-row gap-4 block md:hidden">
            <Button variant="outline" className="flex flex-1 gap-2" onClick={() => setIsOpen(true)}>
              <Coins size={24} /> {t("filter-button")}
            </Button>
            <Button variant="outline" className="flex flex-1 gap-2" onClick={() => setIsFullScreen(true)}>
              <MapTrifold size={24} /> {t("map-button")}
            </Button>
          </div>

          {isFullScreen && <MapComponent properties={filteredHits} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />}

          <div className="lg:col-span-1 hidden md:block">
            <div className="lg:mb-12 mb-8 bg-white px-4 rounded shadow-md">
              <MapComponent properties={filteredHits} />
            </div>

            <div className="bg-white p-4 rounded shadow-md">
              <p className="text-gray-700 font-medium line-clamp-2 mb-2">{t("filter-price")}</p>

              <div className="flex items-center mb-8 gap-4">
                <div className="border-2 border-slate-500 rounded-md p-2 w-1/2">
                  <p className="text-sm font-bold">Min.</p>
                  <p className="text-gray-600 line-clamp-2">
                    R${priceRange[0].toFixed(2)}
                  </p>
                </div>
                <div className="border-2 border-slate-500 rounded-md p-2 w-1/2">
                  <p className="text-sm font-bold">Max.</p>
                  <p className="text-gray-600 line-clamp-2">
                    R${`${priceRange[1].toFixed(2)} ${priceRange[1] === 1000 ? " +" : ""}`}
                  </p>
                </div>
              </div>

              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                min={0}
                max={1000}
                step={10}
              />
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2 w-full">
            {filteredHits?.map((property) => (
              <PropertyCard hit={property} />
            ))}
          </div>
          {/* <div className="col-span-2">
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

            <div className="space-y-4 ">
              {filteredHits?.map((property) => (
                <PropertyCard hit={property} />
              ))}
            </div>
          </InstantSearch>
        </div> */}
        </div>
      </InstantSearch>

      <FilterModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
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
