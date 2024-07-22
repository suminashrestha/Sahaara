import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface GeolocationHook {
  isLoading: boolean;
  position: Coordinates | null;
  error: string | null;
  getPosition: () => void;
}

export default function useGeolocation(
  defaultPosition: Coordinates | null = null
): GeolocationHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Coordinates | null>(defaultPosition);
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
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
        setError(null); // Reset the error when the position is successfully fetched
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
