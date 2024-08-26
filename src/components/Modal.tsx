import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, Typography } from "@mui/material";
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
  button: React.ReactNode;
  okFunction: () => void;
  title: string;
}
export default function BasicModal({ ...props }: IProps) {
  const { okFunction, button, title } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleOk() {
    okFunction();
    handleClose();
  }
  return (
    <React.Fragment>
      <Box onClick={handleOpen}>{button}</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="pb-10 " variant="h6">
            {title}
          </Typography>
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
                onClick={handleOk}
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
    </React.Fragment>
  );
}
