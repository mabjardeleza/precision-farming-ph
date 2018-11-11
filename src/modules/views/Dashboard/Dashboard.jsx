import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import CardImage from "../../components/CardImage/CardImage.jsx";

import { bugs, website } from "../../variables/general.jsx";

import { dailySalesChart } from "../../variables/charts.jsx";
import { SENSOR_DATA } from "../../constants";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {
  getOverview,
  getProgressStatus,
  getTodos,
  getDaily
} from "../../selectors";

import {
  overviewActions,
  barnsActions,
  barnStatusActions
} from "../../actions";

const FIELDS = [
  {
    key: "aggregatedTemperature",
    show: false
  },
  {
    key: "aggregatedHumidity",
    show: false
  },
  {
    key: "pigCount",
    show: false
  }
];

class Dashboard extends React.Component {
  state = {
    value: 0,
    aggregatedTemperature: true,
    aggregatedHumidity: false,
    pigCount: false
  };

  componentDidMount() {
    const { requestOverview, requestBarns, requestBarnStatus } = this.props;
    requestOverview();
    requestBarns();
    requestBarnStatus();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  getChartData = () => {
    const stateCopy = this.state;
    const series = [];
    FIELDS.forEach(field => {
      if (stateCopy[field.key]) {
        const fieldData = SENSOR_DATA.slice(0, 7).map(data => data[field.key]);
        series.push(fieldData);
      }
    });
    const data = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series
    };
    return dailySalesChart(data);
  };

  render() {
    const { classes, overview, progress, todos, daily } = this.props;
    const { aggregatedTemperature, aggregatedHumidity, pigCount } = this.state;
    const chartData = this.getChartData();
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.progressBarContainer}>
              <ProgressBar percentage={progress.progress} />
            </div>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{ background: "#C33760" }}>
                <h4 className={classes.cardTitleWhite}>Daily</h4>
              </CardHeader>
              <CardBody>
                <Tasks
                  checkedIndexes={[0]}
                  tasksIndexes={[0, 1]}
                  tasks={website}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{ background: "#5C5057" }}>
                <h4 className={classes.cardTitleWhite}>Suggested Actions</h4>
              </CardHeader>
              <CardBody>
                <Tasks
                  checkedIndexes={[0, 3]}
                  tasksIndexes={[0, 1, 2, 3]}
                  tasks={bugs}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader style={{ background: "#558AB2" }}>
                <ChartistGraph
                  className="ct-chart"
                  data={chartData.data}
                  type="Line"
                  options={chartData.options}
                  listener={chartData.animation}
                />
              </CardHeader>
              <CardBody>
                <h3 className={classes.cardTitle}>Farm Metrics</h3>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={aggregatedTemperature}
                        onChange={this.handleCheck("aggregatedTemperature")}
                        value="aggregatedTemperature"
                        style={{ color: "#76C1CF" }}
                      />
                    }
                    label="Temperature"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={aggregatedHumidity}
                        onChange={this.handleCheck("aggregatedHumidity")}
                        value="aggregatedHumidity"
                        style={{ color: "#76C1CF" }}
                      />
                    }
                    label="Humidity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={pigCount}
                        onChange={this.handleCheck("pigCount")}
                        value="pigCount"
                        style={{ color: "#76C1CF" }}
                      />
                    }
                    label="Pig count"
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    overview: getOverview(state),
    progress: getProgressStatus(state),
    todos: getTodos(state),
    daily: getDaily(state)
  };
}

const mapDispatchToProps = {
  requestOverview: overviewActions.request,
  requestBarns: barnsActions.request,
  requestBarnStatus: barnStatusActions.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(dashboardStyle)(Dashboard));
