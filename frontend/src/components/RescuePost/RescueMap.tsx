import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useAppSelector } from "../../hooks/useRedux";
import useGeolocation from "../../hooks/useGeolocation";
import Button from "../Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import L from "leaflet";

const myLocation = L.icon({
  iconUrl: '/myLocation.png', 
  iconSize: [100, 95], // Size of the icon
  iconAnchor: [50, 50], // Point of the icon which will correspond to marker's location
  // popupAnchor: [-3, -76], //
})
const rescuePin = L.icon({
  iconUrl: '/rescueLocation.png', 
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
  // popupAnchor: [-3, -76], //
})

function RescueMap() {
  const [mapPosition, setMapPositon] = useState([40, 0]);
  // const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.rescuePost);
  const navigate = useNavigate();

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
      <MapContainer
        className="h-full"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <Marker position={mapPosition} icon={myLocation}></Marker>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map((post) => (
          <Marker
            position={[post.location?.lat, post.location?.lng]}
            key={post._id} icon={rescuePin}
          >
            <Popup>
              <div className="flex flex-col justify-center gap-2">
                {post.title}
                <Button onClick={() => navigate(`${post._id}`)}>View post</Button>
              </div>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
      <div className="absolute bottom-10 right-96 z-[1000]">
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading ...." : "View nearby"}
        </Button>
      </div>
    </div>
  );
}

function ChangeCenter({
  position,
}: {
  position: { lat: number; lng: number };
}) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default RescueMap;
