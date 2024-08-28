import { Box } from "@mui/material";
import React from "react";
import { DraggableMarker } from "../pages/adminPages/Xaritalar";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDataContext } from "./Context";
export function FiliallarLocation({ id }: { id: string | number }) {
  const { filiallar } = useDataContext();
  const filial = filiallar.find((item) => item.id === id);
  return (
    <Box sx={{ height: "800px", width: "800px" }}>
      <MapContainer
        center={[41.32515, 69.29151]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      {filial && (
        <DraggableMarker
          position={filial.cardinate}
          popupText={filial.moljal}
        ></DraggableMarker>
      )}
    </Box>
  );
}
