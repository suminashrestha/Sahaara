import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import useGeolocation from "../../hooks/useGeolocation";
import Button from "../Button";
import { useEffect, useState } from "react";

function RescueMap() {
  const [mapPosition, setMapPositon] = useState([40, 0]);
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.rescuePost);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (geoLocationPosition)
      setMapPositon([geoLocationPosition?.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="h-full w-[60%] bg-yellow-300 z-10">
      {
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading ...." : "View nearby"}
        </Button>
      }
      <MapContainer
        className="h-full"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <Marker position={mapPosition}></Marker>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map((post) => (
          <Marker
            position={[post.location?.lat, post.location?.lng]}
            key={post._id}
          >
            <Popup>{post.title}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default RescueMap;
