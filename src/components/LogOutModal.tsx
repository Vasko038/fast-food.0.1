import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { MainRoute } from "./Context";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
interface IProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  buttonText: string;
}
export default function BasicModal({ ...props }: IProps) {
  const { children, icon, buttonText } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setActivePage } = React.useContext(MainRoute);
  return (
    <div>
      <Button fullWidth sx={{ textTransform: "none" }} onClick={handleOpen}>
        {icon} {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                onClick={handleClose}
                fullWidth
                variant="contained"
                color="inherit"
              >
                Yoq
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => setActivePage("LoginPage")}
                sx={{ bgcolor: "orange", "&:hover": { bgcolor: "orange" } }}
                fullWidth
                variant="contained"
              >
                Ha
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
