import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';import Layout from '../components/Layout';
import image2 from '../assets/invite.svg'

import image3 from '../assets/classes.svg'
import Grid from '@mui/material/Grid'
import DashboardCard from '../components/DashboardCard'


import Axios from "axios";

export default function FormDialog({ props }) {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const [marks, setMarks] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };
  const submitAssignment = () => {
    Axios.post("/api/assignment/create", {
      subject: subject,
      totalMarks: marks,
      dueTime: time,
      dueDate: date,
      instructions: instructions,
     
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log("Error"));
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(subject,marks, date, time, instructions);
  return (
    <Layout>
        <Grid style={{margin: 'auto'}} container spacing={24}>
                <Grid item md={5} onClick={handleClickOpen}> 
                    <DashboardCard head='Add New Assignment' image={image3}   />
                </Grid>
                <Grid item md={5}> 
                    <DashboardCard head='View all Submittions' image={image2}   />
                </Grid>
      {/* <Button
        variant="outlined"
        color="#66bb6a"
        endIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen}
      > */}
      
      {/* </Button> */}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let the student know the details of the assignment.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subject"
            type="text"
            fullWidth
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Total Marks"
            type="number"
            fullWidth
            value={marks}
            onChange={(e) => {
              setMarks(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Due Date"
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
            label="Due Time"
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
            label="Instructions"
            type="textarea"
            fullWidth
            value={instructions}
            onChange={(e) => {
              setInstructions(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitAssignment();
              handleClose();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}