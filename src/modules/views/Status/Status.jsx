import React, { Component } from "react";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CardImage from "../../components/CardImage/CardImage.jsx";
import CardStatus from "../../components/CardStatus/CardStatus.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import avatar from "../../assets/img/faces/marc.jpg";
import { getBarns, getBarnStatus } from "../../selectors";
import { barnsActions, barnStatusActions } from "../../actions";

const styles = {
  cardContainer: {
    display: "flex",
    marginBottom: "30px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Status extends Component {
  componentDidMount() {
    const { requestBarns, requestBarnStatus } = this.props;
    requestBarns();
    requestBarnStatus();
  }
  render() {
    const { classes, barns, barnStatus } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.cardContainer}>
              <CardStatus data={barnStatus} />
            </div>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {barns.map(barn => {
            return (
              <GridItem xs={6} sm={6} md={6} key={barn.id}>
                <div className={classes.cardContainer}>
                  <Link to={`/status-detail/${barn.id}`}>
                    <CardImage title={`Barn ${barn.barn}`} image={barn.image} />
                  </Link>
                </div>
              </GridItem>
            );
          })}
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    barns: getBarns(state),
    barnStatus: getBarnStatus(state)
  };
}

const mapDispatchToProps = {
  requestBarns: barnsActions.request,
  requestBarnStatus: barnStatusActions.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Status));
