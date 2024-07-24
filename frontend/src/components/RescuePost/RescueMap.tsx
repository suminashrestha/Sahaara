import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useAppSelector } from "../../hooks/useRedux";
import useGeolocation from "../../hooks/useGeolocation";
import Button from "../Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import L from "leaflet";

// Define icons
const myLocation = L.icon({
  iconUrl: '/myLocation.png', 
  iconSize: [100, 95],
  iconAnchor: [50, 50],
});

const rescuePin = L.icon({
  iconUrl: '/rescueLocation.png', 
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function RescueMap() {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const { posts } = useAppSelector((state) => state.rescuePost);
  const navigate = useNavigate();

  const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation();

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat || 40, geoLocationPosition.lng || 0]);
    }
  }, [geoLocationPosition]);

  // Ensure posts is an array
  const postList = Array.isArray(posts) ? posts : [];

  return (
    <div className="h-full w-[60%] bg-yellow-300 z-10">
      <MapContainer
        className="h-full"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition} icon={myLocation}></Marker>
        {postList.map((post) => (
          <Marker
            position={[
              post.location?.lat || 0, 
              post.location?.lng || 0
            ]}
            key={post._id}
            icon={rescuePin}
          >
            <Popup>
              <div className="flex flex-col justify-center gap-2">
                {post.title || "No Title"}
                <Button onClick={() => navigate(`${post._id}`)}>View post</Button>
              </div>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={{ lat: mapPosition[0], lng: mapPosition[1] }} />
      </MapContainer>
      <div className="absolute bottom-10 right-96 z-[1000]">
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading ...." : "View nearby"}
        </Button>
      </div>
    </div>
  );
}

function ChangeCenter({ position }: { position: { lat: number; lng: number } }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default RescueMap;
