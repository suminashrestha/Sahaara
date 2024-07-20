import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Location {
  position: null | Coordinates;
}

interface GeolocationHook {
  isLoading: boolean;
  position: Location;
  error: string | null;
  getPosition: () => void;
}

export default function useGeolocation(defaultPosition: Location = { position: null }): GeolocationHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Location>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition(): void {
    if (!navigator.geolocation) {
      setError("Please enable location");
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
