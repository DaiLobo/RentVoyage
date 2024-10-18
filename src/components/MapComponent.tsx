import Router from "next/router";
import { useEffect, useState } from "react";

import { PropertyType } from "@/interfaces/PropertyType";
import { GeoLocationService } from "@/services/GeoCoding";
import { APIProvider, InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";

interface MapComponentProps {
  position?: { lat: number; lng: number };
  zoom?: number;
  properties: PropertyType[];
}

const MapComponent: React.FC<MapComponentProps> = ({ properties, position = { lat: -8.0476, lng: -34.8770 }, zoom = 10 }) => {
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
    <div className="h-96 w-full">
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
            >
              <div>
                <h4>{locations[selectedLocation].property.name}</h4>
                <p>{locations[selectedLocation].property.description}</p>
                <p>Preço: R$ {locations[selectedLocation].property.price}</p>
                <p>Capacidade: {locations[selectedLocation].property.capacity} pessoas</p>
              </div>
            </InfoWindow>
          )
          }
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
