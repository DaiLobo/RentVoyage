async function getGeolocation(addresses: string[]) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const locations = [];

  for (const address of addresses) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        locations.push({
          lat: location.lat,
          lng: location.lng
        });
      } else {
        console.error(
          "Erro na geocodificação para o endereço:",
          address,
          data.status
        );
      }
    } catch (error) {
      console.error(
        "Erro ao obter a localização para o endereço:",
        address,
        error
      );
    }
  }

  return locations;
}

async function getGeolocationOneAddress(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      console.error(
        "Erro na geocodificação para o endereço:",
        address,
        data.status
      );
      return null;
    }
  } catch (error) {
    console.error(
      "Erro ao obter a localização para o endereço:",
      address,
      error
    );
    return null;
  }
}

export const GeoLocationService = {
  getGeolocation,
  getGeolocationOneAddress
};
