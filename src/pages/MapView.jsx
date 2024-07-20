import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { clearPath } from "../redux/slices/flightSlices";
const MapView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store.flightReducer);
  //   console.log(flightState);
  const dispatch = useDispatch();

  console.log("mapwievden gelen", flightState.path);
  //Marker iconu oluştur

  const planeIcon = icon({
    iconUrl: "/plane-icon.png",
    iconSize: [25, 25],
  });
  return (
    <MapContainer
      center={[38.948771, 35.425597]}
      zoom={6}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* uçuş verisi kadar ekrana imleç bas */}
      {flightState.flights.map((flight) => (
        <Marker
          icon={planeIcon}
          key={flight.id}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="d-flex flex-column gap-2">
              <span>Kod:{flight.code}</span>
              <button
                onClick={() => {
                  setDetailId(flight.id);
                }}
                className="w-100"
              >
                Detay
              </button>
              {/* rota varsa ekranda temizle butonu koy */}
              {flightState.path.length > 0 && (
                <button onClick={() => dispatch(clearPath())}>
                  Rotayı Temizle
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      {/* uçağın rotasını bas */}
      <Polyline positions={flightState?.path} />
    </MapContainer>
  );
};

export default MapView;
