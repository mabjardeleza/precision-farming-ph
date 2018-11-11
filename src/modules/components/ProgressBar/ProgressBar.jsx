import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import progressBarStyle from "../../assets/jss/custom/components/progressBarStyle.jsx";

const ProgressBar = ({ percentage, classes }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: `${percentage}%`, top: '-125%' }}>You're doing great!</div>
      <div className={classes.progressBar}>
        <div
          className={classes.progressBarFiller}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number
};

export default withStyles(progressBarStyle)(ProgressBar);
