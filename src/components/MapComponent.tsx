import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";

interface MapComponentProps {
  position?: { lat: number; lng: number };
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ position = { lat: -8.0476, lng: -34.8770 }, zoom = 10 }) => {
  const map = useMap()

  return (
    <div className="h-96 w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Map center={position} defaultZoom={zoom}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
