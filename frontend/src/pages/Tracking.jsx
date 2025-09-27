import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { WebSocketManager } from "./websocketManager";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import bike from "../assets/track.png";

// Set default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom provider icon
const providerIcon = new L.Icon({
  iconUrl: bike,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const SeekerMarker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position && position[0] && position[1]) {
      map.flyTo(position, 15, { duration: 1 });
    }
  }, [position, map]);
  return position ? <Marker position={position} /> : null;
};

export default function Tracking() {
  const { username: targetUsername } = useParams();
  const [user, setUser] = useState(null);
  const [selfPos, setSelfPos] = useState(null);
  const [targetPos, setTargetPos] = useState(null);
  const [route, setRoute] = useState([]);
  const [info, setInfo] = useState({ distance: "", duration: "" });
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  const wsManager = useRef(null);
  const geolocationWatchId = useRef(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:8001/api/seeker-profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...res.data, role: "seeker", username: res.data.username || res.data.user?.username });
    } catch {
      try {
        const res = await axios.get("http://localhost:8001/api/provider-profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ ...res.data, role: "provider", username: res.data.username || res.data.user?.username });
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    }
  };

  const initializeWebSocket = () => {
    if (!targetUsername || !user) return;

    const wsUrl = `ws://localhost:8001/ws/track/${targetUsername}/`;
    wsManager.current = new WebSocketManager(wsUrl, {
      maxReconnectAttempts: 10,
      reconnectInterval: 3000
    });

    wsManager.current.on('open', () => {
      console.log("✅ WebSocket connected");
      setConnectionStatus("connected");
      if (selfPos) {
        sendLocation(selfPos[0], selfPos[1]);
      }
    });

    wsManager.current.on('message', (data) => {
      if (data.latitude && data.longitude && data.username === targetUsername) {
        const newPos = [parseFloat(data.latitude), parseFloat(data.longitude)];
        setTargetPos(newPos);
        if (selfPos && selfPos[0] && selfPos[1]) {
          drawRoute(selfPos, newPos);
        }
      }
    });

    wsManager.current.on('error', (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
    });

    wsManager.current.on('close', (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
      setConnectionStatus(event.code === 1000 ? "disconnected" : "reconnecting");
    });

    wsManager.current.connect();
  };

  const sendLocation = (latitude, longitude) => {
    if (!wsManager.current || !user) return;

    wsManager.current.send({
      action: "location",
      username: user.username,
      role: user.role,
      latitude,
      longitude
    });
  };

  const drawRoute = async (start, end) => {
    if (!start || !end || start.length !== 2 || end.length !== 2) return;

    const apiKey = "5b3ce3597851110001cf624817748a7cfef7498ba1926b8bd083facf";
    try {
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        { coordinates: [start.slice().reverse(), end.slice().reverse()] },
        { headers: { Authorization: apiKey, "Content-Type": "application/json" } }
      );

      if (res.data.features && res.data.features[0]) {
        const coords = res.data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        const summary = res.data.features[0].properties.summary;
        setRoute(coords);
        setInfo({
          distance: `${(summary.distance / 1000).toFixed(2)} km`,
          duration: `${(summary.duration / 60).toFixed(1)} mins`,
        });
      }
    } catch (err) {
      console.error("Error drawing route:", err);
      setRoute([]);
      setInfo({ distance: "N/A", duration: "N/A" });
    }
  };

  const setupGeolocation = () => {
    if (!user) return;

    const handlePositionSuccess = (pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setSelfPos(coords);
      sendLocation(...coords);

      if (targetPos && targetPos[0] && targetPos[1]) {
        drawRoute(coords, targetPos);
      }
    };

    const handlePositionError = (err) => {
      console.warn("Geolocation error:", err);
      const defaultPos = [28.6139, 77.2090]; // New Delhi
      setSelfPos(defaultPos);
      sendLocation(...defaultPos);
    };

    geolocationWatchId.current = navigator.geolocation.watchPosition(
      handlePositionSuccess,
      handlePositionError,
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000
      }
    );
  };

  useEffect(() => {
    fetchProfile();
    return () => {
      if (wsManager.current) wsManager.current.close();
      if (geolocationWatchId.current) navigator.geolocation.clearWatch(geolocationWatchId.current);
    };
  }, []);

  useEffect(() => {
    if (user && targetUsername) {
      initializeWebSocket();
    }
    return () => {
      if (wsManager.current) wsManager.current.close();
    };
  }, [user, targetUsername]);

  useEffect(() => {
    setupGeolocation();
    return () => {
      if (geolocationWatchId.current) navigator.geolocation.clearWatch(geolocationWatchId.current);
    };
  }, [user, targetPos]);

  const mapCenter = selfPos || [28.6139, 77.2090];

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded shadow">
        {connectionStatus === "connected" ? "🟢 Connected" :
         connectionStatus === "error" ? "🔴 Error" :
         connectionStatus === "reconnecting" ? "🟠 Reconnecting" : "🟡 Connecting"}
      </div>

      <MapContainer
        className="w-full h-full"
        center={mapCenter}
        zoom={15}
        style={{ zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {selfPos && selfPos[0] && selfPos[1] && (
          <Marker position={selfPos}>
            <Popup>Your Position</Popup>
          </Marker>
        )}

        {targetPos && targetPos[0] && targetPos[1] && (
          <Marker position={targetPos} icon={providerIcon}>
            <Popup>{targetUsername}</Popup>
          </Marker>
        )}

        {route.length > 0 && (
          <Polyline
            positions={route}
            color="blue"
            weight={5}
            opacity={0.7}
          />
        )}
      </MapContainer>

      <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow z-[1000]">
        {info.distance ? (
          <>
            <p><strong>Distance:</strong> {info.distance}</p>
            <p><strong>ETA:</strong> {info.duration}</p>
          </>
        ) : (
          <p>Calculating route...</p>
        )}
        <p className="mt-2"><strong>Tracking:</strong> {targetUsername}</p>
        <p className="mt-2 text-sm text-gray-600">
          Status: {connectionStatus}
        </p>
      </div>
    </div>
  );
}

