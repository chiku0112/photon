import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
export default function ActionAreaCard(props) {
  return (
    <Card className="cxv-dashboard-card" style={{width: 300, height: 350}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.head}
          </Typography>
          {props.sub ? (
              <>
            <Typography variant="caption" display="block" gutterBottom>
              {props.sub}
            </Typography>
            <Divider />
            <Typography variant="caption" display="block" gutterBottom>
              {props.sub2}
            </Typography>
            </>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
