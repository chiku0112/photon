import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import image1 from "../assets/assignment.svg";
import image2 from "../assets/invite.svg";
import image3 from "../assets/classes.svg";
import image4 from "../assets/addClass.svg";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";


import axios from "axios";
import { Link } from "react-router-dom";

const images = [image1, image2, image3];

export default function Classroom(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setname] = React.useState("");
  const [toast, setToast] = React.useState({
    message: "Something Wrong, we were unable to add a class",
    type: "error",
  });

  const handleClickOpen = () => {
    setToast({
      message: "Something Wrong, we were unable to add a class",
      type: "error",
    });
    setname('');
    setOpen(true);
  };

  const handleSubmit = () => {
    console.log(name);
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
          setname("");
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

  const [classes, setClasses] = React.useState([]);
  const [isClassesLoading, toggleIsClassesLoading] = React.useState(true);
  console.log(props);
  useEffect(() => {
    axios
      .get("/api/classes/all", { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          setClasses(res.data);
          toggleIsClassesLoading(false);
        }
        console.log(res.data, res.status);
      })
      .catch((err) => console.log(err));
  }, []);
  if (isClassesLoading) return "Loading....";
  return (
    <Layout>
      <Grid
        style={{ paddingLeft: "50px", paddingRight: 50, paddingTop: "30px", marginBottom: 50 }}
        container
        spacing={12}
      >
        {classes.map((v, i) => {
          return (
            <Grid key={i} item md={4} xs={4}>
              <Link to={`/classroom/${v._id}`}>
                <DashboardCard
                  sub={`${v.members.length} Students`}
                  sub2={`${Math.floor(
                    Math.random() * 6.9
                  )} Assignments Due for Checking`}
                  head={v.name}
                  image={images[Math.floor(Math.random() * 3)]}
                />
              </Link>
            </Grid>
          );
        })}

        <Grid item md={3} xs={4} onClick={handleClickOpen}>
          
            <DashboardCard
              sub={`Add Students`}
              sub2={`after creating the class`}
              head={`Add Class`}
              image={image4}
            />
          
        </Grid>
      </Grid>
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
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
 
    </Layout>
  );
}
