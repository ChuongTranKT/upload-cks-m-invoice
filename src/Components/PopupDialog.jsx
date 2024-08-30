import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupDialog({
  isOpen,
  setIsOpen,
  mst,
  setIsConfirm,
  isLoadingUploadCks,
  setCookie,
  cookie,
}) {
  console.log("🚀 ~ cookie:", cookie);
  const handleClose = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const handleConfirm = () => {
    if (setIsConfirm) {
      setIsConfirm(true);
    }
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Xác nhận upload cks"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có chắc chắn muốn upload cks cho mst {mst}
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="cookie"
          name="cookie"
          label="Cookie"
          type="text"
          fullWidth
          variant="standard"
          value={cookie}
          onChange={(e) => setCookie && setCookie(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 2 }}>
        <Button onClick={handleClose} sx={{ fontSize: "12px" }}>
          Không
        </Button>
        <Button
          onClick={handleConfirm}
          sx={{
            background: "#de2a2a",
            fontSize: "12px",
            color: "white",
            py: 0.6,
            px: 1.5,
            ":hover": {
              background: "#DC3444",
              boxShadow: "0 0 0 3px white, 0 0 0 5px #f59090", // White gap and red border
            },
          }}
        >
          {isLoadingUploadCks ? (
            <div className="loader"></div>
          ) : (
            <span style={{ paddingLeft: 5 }}>Đồng ý</span>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
