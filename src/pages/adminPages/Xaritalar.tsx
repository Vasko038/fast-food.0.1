import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

const getIcon = (color: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.15 6.5 11 7 11s7-6.85 7-11c0-3.87-3.13-7-7-7zm0 13c-1.93 0-3.5-2.07-3.5-3.5S10.07 8 12 8s3.5 2.07 3.5 3.5S13.93 15 12 15zm0-5.5c-1.03 0-1.88.85-1.88 1.88S10.97 13 12 13s1.88-.85 1.88-1.88S13.03 8.5 12 8.5z" fill="${color}"/>
</svg>
`;

const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(getIcon("#FF0000"))}`,
  iconSize: [54, 54],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

interface DraggableMarkerProps {
  position: [number, number];
}

function DraggableMarker({ position }: DraggableMarkerProps) {
  return (
    <Marker
      position={position}
      icon={customIcon}
      draggable={false} // Markerni tahrir qilish mumkin emas
    >
      <Popup>
        Marker <br /> O'zbekiston
      </Popup>
    </Marker>
  );
}

export function Xarita() {
  const [position1] = useState<[number, number]>([41.31115, 69.27951]);
  const [position2] = useState<[number, number]>([41.32115, 69.28951]);
  const [position3] = useState<[number, number]>([41.33115, 69.29951]);
  const [position4] = useState<[number, number]>([41.34115, 69.30951]);

  return (
    <Box className="w-full h-full bg-slate-100 ">
      <Box className="h-[90px] bg-white shadow-lg "></Box>
      <Box
        sx={{ height: "calc(100vh - 90px)" }}
        className="relative flex justify-center"
      >
        <Box
          sx={{ height: "calc(100vh - 90px - 24px)", width: "100%" }}
          className="p-4 mx-4 my-3 bg-white shadow-lg "
        >
          <MapContainer
            center={[41.32515, 69.29151]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker position={position1} />
            <DraggableMarker position={position2} />
            <DraggableMarker position={position3} />
            <DraggableMarker position={position4} />
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
}
