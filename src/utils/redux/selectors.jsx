import { createSelector } from "reselect";
import get from "lodash/get";

function convertSelector(selector) {
  let stateSelector = null;
  if (typeof selector === "string") {
    stateSelector = state => get(state, selector);
  } else if (typeof selector === "function") {
    stateSelector = selector;
  }

  return stateSelector;
}

// eslint-disable-next-line import/prefer-default-export
export function createEntityListSelector(idSelector, entitySelector) {
  const stateIdSelector = convertSelector(idSelector);
  if (stateIdSelector == null) {
    throw new TypeError("idSelector must be a valid path string or a function");
  }

  const stateEntitySelector = convertSelector(entitySelector);
  if (entitySelector == null) {
    throw new TypeError(
      "entitySelector must be a valid path string or a function"
    );
  }

  return createSelector(
    [stateIdSelector, stateEntitySelector],
    (ids, entities) => ids.map(id => entities[id])
  );
}

export function createSingleEntitySelector(idSelector, entitySelector) {
  const stateIdSelector = convertSelector(idSelector);
  if (stateIdSelector == null) {
    throw new TypeError("idSelector must be a valid path string or a function");
  }

  const stateEntitySelector = convertSelector(entitySelector);
  if (stateEntitySelector == null) {
    throw new TypeError(
      "entitySelector must be a valid path string or a function"
    );
  }

  return createSelector(
    [stateIdSelector, stateEntitySelector],
    (id, entity) => (id == null ? {} : entity[id])
  );
}
