import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

function RescueMap() {
  return (
    <div className="h-full w-[60%] bg-yellow-300 z-10">
      <MapContainer
        className="h-full"
        center={[40, 0]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <Marker position={[40, 0]}>
          <Popup>
            A popup for your marker.
          </Popup>
        </Marker>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default RescueMap;
