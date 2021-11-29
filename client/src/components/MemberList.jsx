import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { yellow } from "@mui/material/colors";

export default function CheckboxListSecondary(props) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: 300,
      }}
    >
      {props.members.map((value, indx) => {
        const labelId = `checkbox-list-secondary-label-${indx}`;
        return (
          <ListItem style={{ marginTop: 3 }} key={indx} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: yellow[100] }}
                  alt={`Avatar n°${indx + 1}`}
                  src={
                    "https://avatars.dicebear.com/v2/male/:" +
                    value._id +
                    ".svg"
                  }
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
