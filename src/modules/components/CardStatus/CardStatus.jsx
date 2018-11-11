import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const cardStatusStyles = {
  card: {
    width: 350
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },
  header: {
    marginBottom: "10px"
  },
  cardAction: {
    width: "100%"
  }
};

const CardStatus = ({ classes, data }) => {
  console.log(data);
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardAction}>
        <CardContent className={classes.cardAction}>
          <Typography gutterBottom variant="title" component="h2" className={classes.header}>
            Farm Status
          </Typography>
          <Typography gutterBottom variant="subheading" component="h4">
            <b>{data.pigCount}</b> Pigs
          </Typography>
          {/* <Typography gutterBottom variant="display1" component="h4">
            <b>{data.mortalityRate}%</b> Mortality Rate
          </Typography> */}
          <Typography gutterBottom variant="subheading" component="h4">
            <b>{data.aggregatedTemperature}</b> °C Average Temperature
          </Typography>
          <Typography gutterBottom variant="subheading" component="h4">
            <b>{data.aggregatedHumidity}</b> Humidity
          </Typography>
          <Typography gutterBottom variant="subheading" component="h4">
            <b>{data.aggregatedAirQuality}</b>(mg / cubic meter) Air Quality
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CardStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({}).isRequired
};

export default withStyles(cardStatusStyles)(CardStatus);
