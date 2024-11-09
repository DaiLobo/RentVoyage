import { useTranslation } from "next-i18next";
import Router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { PropertyType } from "@/interfaces/PropertyType";
import { GeoLocationService } from "@/services/GeoCoding";
import { APIProvider, InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";

interface MapComponentProps {
  position?: { lat: number; lng: number };
  zoom?: number;
  properties: PropertyType[];
  isFullScreen?: boolean;
  setIsFullScreen?: Dispatch<SetStateAction<boolean>>;
}

const MapComponent: React.FC<MapComponentProps> = ({ properties, position = { lat: -8.0476, lng: -34.8770 }, zoom = 10, isFullScreen, setIsFullScreen }) => {
  const { t } = useTranslation("stays");
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [locations, setLocations] = useState<{
    lat: number,
    lng: number,
    property: PropertyType
  }[]>([]);

  useEffect(() => {
    const addresses = properties.map((property) => property.address);
    GeoLocationService.getGeolocation(addresses).then((locations) => {
      if (locations?.length > 0) {
        const mappedLocations = locations.map((location, index) => ({
          lat: location.lat,
          lng: location.lng,
          property: properties[index]
        }));

        setLocations(mappedLocations);
      }
    });
  }, [properties]);

  return (
    <div className={`${isFullScreen ? "fixed top-0 left-0 w-full h-full z-50" : "h-96 w-full"} bg-white`}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Map defaultCenter={locations[0] ? { lat: locations[0].lat, lng: locations[0].lng } : position}
          defaultZoom={zoom}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              title={location.property.name}
              position={{ lat: location.lat, lng: location.lng }}
              clickable
              onClick={() => Router.push(`/booking/view/${location.property.id}`)}
              onMouseOver={() => setSelectedLocation(index)}
              onMouseOut={() => setSelectedLocation(null)}
            />
          ))
          }

          {selectedLocation !== null && (
            <InfoWindow
              maxWidth={200}
              headerDisabled
              position={{ lat: locations[selectedLocation].lat, lng: locations[selectedLocation].lng }}
              pixelOffset={[0, -40]}
            >
              <div className="grid gap-1">
                <h4 className="text-sm font-semibold">{locations[selectedLocation].property.name}</h4>
                <p className="text-gray-600 line-clamp-3">{locations[selectedLocation].property.description}</p>
                <p className="text-[#1FC162]"><span className="font-medium">{t("map.price")}:</span> R$ {locations[selectedLocation].property.price.toFixed(2)}</p>
                <p><span className="font-medium">{t("map.capacity")}: </span> {locations[selectedLocation].property.capacity} {t("search.guests.placeholder")}</p>
              </div>
            </InfoWindow>
          )
          }
        </Map>
      </APIProvider>

      {(isFullScreen && setIsFullScreen) && <button
        onClick={() => setIsFullScreen(false)}
        className="absolute top-16 right-1.5 bg-white hover:text-white px-4 py-2 rounded-lg shadow-md z-10"
      >
        Fechar mapa
      </button>}

    </div >
  );
};

export default MapComponent;
