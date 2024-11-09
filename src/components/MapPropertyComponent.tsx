import { useEffect, useState } from "react";

import { GeoLocationService } from "@/services/GeoCoding";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface MapPropertyComponentProps {
  position?: { lat: number; lng: number };
  zoom?: number;
  address: string;
}

const MapPropertyComponent: React.FC<MapPropertyComponentProps> = ({ address, position = { lat: -8.0476, lng: -34.8770 }, zoom = 10 }) => {
  const [location, setLocation] = useState<{ lat: number, lng: number, }>();

  useEffect(() => {
    GeoLocationService.getGeolocationOneAddress(address).then((location) => {
      if (location) {
        setLocation({
          lat: location.lat,
          lng: location.lng,
        });
      }
    });
  }, [address]);

  return (
    <div className="h-96 w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Map
          defaultCenter={location ? { lat: location.lat, lng: location.lng } : position}
          center={location && { lat: location.lat, lng: location.lng }}
          defaultZoom={zoom}
        >
          {
            location && (
              <Marker
                position={{ lat: location.lat, lng: location.lng }}
                clickable
              />
            )
          }
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapPropertyComponent;
