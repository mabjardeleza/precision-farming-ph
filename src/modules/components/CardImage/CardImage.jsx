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

const cardImageStyles = {
  card: {
    width: 445
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
    width: "100%"
  }
};

const CardImage = ({ classes, title, image, indicator }) => {
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="200"
          image={require(`modules/assets/img/${image}`)}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {title}
          </Typography>
          {indicator ? (
            <div style={{ color: "#C33760" }}>Needs attention!</div>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CardImage.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default withStyles(cardImageStyles)(CardImage);
