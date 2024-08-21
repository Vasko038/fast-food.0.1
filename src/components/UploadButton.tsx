import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButton() {
  return (
    <Button
      className="flex aspect-square flex-col align-middle rounded-full "
      sx={{
        textTransform: "none",
        bgcolor: "orange",
        borderRadius: "50% 50%",
        "&:hover": { bgcolor: "orange" },
      }}
      fullWidth
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Image
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
