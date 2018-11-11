import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getBarn } from "../../selectors";
import { barnsActions } from "../../actions";

const statusDetailStyles = {
  card: {
    maxWidth: 645
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },
  header: {
    marginBottom: "10px"
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};

class StatusDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { setBarn } = this.props;
    if (id) {
      setBarn(id);
    }
  }

  render() {
    const { classes, barn } = this.props;
    console.log(barn);
    return (
      <div className={classes.contentContainer}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="300"
              image="https://aussiepigfarmers.com.au/wp-content/uploads/2015/11/content-relaxed-animals-in-barn-rared-environment1.jpg"
              title="Contemplative Reptile"
            />
          </CardActionArea>
          <CardContent>
            {barn ? (
              <div>
                <Typography variant="h5" component="h2" className={classes.header}>
                  Barn {barn.barn} Status
                </Typography>
                <Typography gutterBottom variant="h5" component="h4">
                  <b>{barn.pigCount}</b> Pigs
                </Typography>
                {/* <Typography gutterBottom variant="h5" component="h4">
                  <b>{barn.mortalityRate}%</b> Mortality Rate
                </Typography> */}
                {/* <Typography gutterBottom variant="h5" component="h4">
                  <b>{barn.feedConsumption}</b> Feed Consumption
                </Typography> */}
                <Typography gutterBottom variant="h5" component="h4">
                  <b>{barn.aggregatedTemperature}</b> C Average Temperature
                </Typography>
                <Typography gutterBottom variant="h5" component="h4">
                  <b>{barn.aggregatedHumidity}</b> Humidity
                </Typography>
                <Typography gutterBottom variant="h5" component="h4">
                  <b>{barn.aggregatedAirQuality}</b>mg / cubic meter Air Quality
                </Typography>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    );
  }
}

StatusDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    barn: getBarn(state)
  };
}

const mapDispatchToProps = {
  setBarn: barnsActions.setDetailId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(statusDetailStyles)(StatusDetail));
