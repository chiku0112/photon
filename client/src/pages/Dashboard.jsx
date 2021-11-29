import React, {useContext} from 'react'
import Layout from '../components/Layout';
import { Context } from "../Store";
import DashboardCard from '../components/DashboardCard'
import image1 from '../assets/assignment.svg'
import image3 from '../assets/classes.svg'
import Grid from '@mui/material/Grid'
import { Link } from "react-router-dom";
import { Room } from '@mui/icons-material';
import Axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import image2 from '../assets/invite.svg'
export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
  const [room, setRoom] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");
  const [email, setEmail] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };
  const submitSession = () => {
    Axios.post("/api/assignment/book", {
      room: room,
      time: time,
      date: date,
      email: email,
     
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log("Error"));
  };
  const handleClose = () => {
    setOpen(false);
  };
    const [state, dispatch] = useContext(Context);
    if(!state.isAuth) return "Not Authenticated"
    return (
        <Layout>
            <Grid style={{margin: 'auto'}} container spacing={24}>
                <Grid item md={3}> <Link to="/classroom">
                    <DashboardCard head='Classes' image={image3} />
                    </Link>
                </Grid>
                <Grid item md={3}> <Link to="/assignment">
                    <DashboardCard head='Assignment' image={image2} />
                    </Link>
                </Grid> 
                <Grid item md={3} onClick={handleClickOpen}> 
                    <DashboardCard head='Counselling' image={image1} />
                   
                </Grid>
            </Grid>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details to book a session. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room Id"
            type="text"
            fullWidth
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Student Email"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitSession();
              handleClose();
            }}
            color="primary"
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>
        </Layout>
    )
}
