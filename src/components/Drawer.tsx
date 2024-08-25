import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { Fragment } from "react";

export function Drawer({
  open,
  setOpen,
  children,
  width,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;
  width?: string;
}) {
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <Fragment>
      {open && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(241, 245, 249, 0.7)",
              zIndex: 1200,
            }}
            onClick={handleOverlayClick} // Tashqariga bosish
          />
          <Box
            sx={{
              position: "absolute",
              right: 0,
              height: "100%",
              top: 0,
              width: width ? width : "420px",
              backgroundColor: "white",
              borderTop: "8px solid #f1f1f1",
              transform: open ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 1300,
            }}
          >
            <Box className="relative w-full h-full">
              <Box className="absolute">
                <IconButton
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50% 0 0 50%",
                    "&:hover": { backgroundColor: "white" },
                  }}
                  className="bg-white border-r-8 border-l-gray-100 absolute -left-[46px] top-9"
                  onClick={toggleDrawer}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              {children}
            </Box>
          </Box>
        </>
      )}
    </Fragment>
  );
}
