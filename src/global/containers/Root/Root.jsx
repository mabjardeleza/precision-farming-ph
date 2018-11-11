import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider, connect } from "react-redux";
import { Router } from "react-router";

export class Root extends Component {
  onUpdate = () => {};

  render() {
    const { store, history, routes } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} onUpdate={this.onUpdate} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  routes: PropTypes.node.isRequired
};

function mapStateToProps(state) {
  const { request, auth } = state;
  return {
    auth,
    request
  };
}

export default connect(mapStateToProps)(Root);
