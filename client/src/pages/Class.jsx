import React from "react";
import Layout from "../components/Layout";
import { Grid, Typography } from "@mui/material";
import MemberList from "../components/MemberList";
import TeacherDashboardAssignmentTab from "../components/TeacherDashboardAssignmentTab";
import axios from "axios";
import { Button } from "@mui/material";
import AddMember from '../components/AddMember';

export default function Class(props) {
  const [_class, setClass] = React.useState({});
  const [isClassLoading, setClassLoading] = React.useState(true);
  React.useEffect(() => {
    console.log(props.match.params.id);
    axios
      .get(`/api/classes/${props.match.params.id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setClass(res.data);
        setClassLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isClassLoading) return "Loading class...";

  return (
    <Layout>
      <div className="class-heading">
        <Typography variant="h6">{_class.name}</Typography>
      </div>
      <Grid style={{ padding: 30, marginTop: "10px" }} container spacing={2}>
        <Grid sx={{ marginTop: "100px" }} item xs={3} md={2}>
          <div>
            <Typography variant="h6" display="block" gutterBottom>
              Members ({_class.members.length})
            </Typography>
            <MemberList members={_class.members} />
            {/* <Button variant="outlined" className="add-member-btn">
              Add Member
            </Button> */}
            <AddMember id={props.match.params.id} />
          </div>
        </Grid>
        <Grid item xs={9} md={10}>
          <TeacherDashboardAssignmentTab />
        </Grid>
      </Grid>
    </Layout>
  );
}
