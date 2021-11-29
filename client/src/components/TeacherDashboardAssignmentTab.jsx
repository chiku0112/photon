import React, {useEffect} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AssignmentSharp } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import axios from "axios";

import AssignmentCard from "./AssignmentCard";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonForce() {
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [assignments, setAssignments] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get("/api/assignment/all", { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          setAssignments(res.data);
          
        }
        console.log(res.data, res.status);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"assignment-tab-container"}>
      <AppBar position="static" color="default" style={{maxWidth: "100%", margin: "auto"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Due" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      {assignments.map((v, i) => {
        return (
          <Card sx={{ maxWidth: "70%", marginLeft: "10%", marginBottom: "25px", marginTop: "25px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: yellow[500] }} aria-label="recipe" src={'https://avatars.dicebear.com/v2/male/:' + Math.random() + '.svg'} />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title= {v.subject}
              subheader={`Total Marks: ${v.totalMarks} `}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" >
              {`Due Time: ${v.dueTime} `}
              
                | Expand to view instructions of the project.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Instructions:</Typography>
                <Typography paragraph>
                  {v.instructions}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        )
      })}
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        Due Assignment
      </TabPanel>
    </div>
  );
}
