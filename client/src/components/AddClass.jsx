import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddClassDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [email, setemail] = React.useState("");
  const [toast, setToast] = React.useState({
    message: "Something Wrong, we were unable to add a class",
    type: "error",
  });

  const handleClickOpen = () => {
    setToast({
      message: "Something Wrong, we were unable to add a class",
      type: "error",
    });
    setemail('');
    setOpen(true);
  };

  const handleSubmit = () => {
    console.log(email);
    axios
      .post("/api/classes/add-class", {
        withCredentials: true,
        name
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setToast({ message: "Class Added Succesfully", type: "success" });
          handleClick2();
          setOpen(false);
          setemail("");
        }
      })
      .catch((err) => {
        handleClick2();
        console.log(err);
      });
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClick2 = (event) => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="add-member-btn"
      >
        Add Class
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new class you want to add.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            value={nname}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{
            width: "100%",
            background: `${
              toast.type == "error" ? "red" : "#3bb63b9c"
            } !important`,
            color: "white !important",
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
