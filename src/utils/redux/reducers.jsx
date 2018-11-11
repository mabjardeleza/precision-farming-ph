import { combineReducers } from "redux";
import has from "lodash/has";
import merge from "lodash/merge";
import union from "lodash/union";

export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) =>
  has(handlers, action.type) ? handlers[action.type](state, action) : state;

const createLoadingReducer = ({ REQUEST, SUCCESS, ERROR }) =>
  createReducer(false, {
    [REQUEST]: () => true,
    [SUCCESS]: () => false,
    [ERROR]: () => false
  });

const createErrorReducer = ({ REQUEST, SUCCESS, ERROR }) =>
  createReducer(false, {
    [REQUEST]: () => false,
    [SUCCESS]: () => false,
    [ERROR]: (state, action) => action.error
  });

const createEntityReducer = ({ SUCCESS, INVALIDATE }, entityName) =>
  createReducer(
    {},
    {
      [SUCCESS]: (state, action) => action.payload.entities[entityName],
      [INVALIDATE]: () => {}
    }
  );

const createEntityIdReducer = ({ SUCCESS, INVALIDATE }) =>
  createReducer(null, {
    [SUCCESS]: (state, action) => action.payload.result,
    [INVALIDATE]: () => null
  });

const createEntitiesByIdReducer = ({ SUCCESS, INVALIDATE }, entityName) =>
  createReducer(
    {},
    {
      [SUCCESS]: (state, action) =>
        merge({}, state, action.payload.entities[entityName] || {}),
      [INVALIDATE]: () => ({})
    }
  );

const createAllEntityIdsReducer = ({ SUCCESS, INVALIDATE }) =>
  createReducer([], {
    [SUCCESS]: (state, action) => union([], state, action.payload.result || []),
    [INVALIDATE]: () => []
  });

const createNextPageReducer = ({ SUCCESS, INVALIDATE }) =>
  createReducer(null, {
    [SUCCESS]: (state, action) => action.payload.nextPage || null,
    [INVALIDATE]: () => null
  });

const createLastUpdatedReducer = ({ SUCCESS, INVALIDATE }) =>
  createReducer(null, {
    [SUCCESS]: () => Date.now(),
    [INVALIDATE]: () => Date.now()
  });

const createDidInvalidateReducer = ({ REQUEST, SUCCESS, INVALIDATE }) =>
  createReducer(true, {
    [REQUEST]: state => state,
    [SUCCESS]: () => false,
    [INVALIDATE]: () => true
  });

export const createAsyncReducer = (actionTypes, additionalReducers = {}) =>
  combineReducers({
    loading: createLoadingReducer(actionTypes),
    error: createErrorReducer(actionTypes),
    ...additionalReducers
  });

export const createSingleEntityReducer = (
  actionTypes,
  entityName,
  additionalReducers = {}
) =>
  combineReducers({
    loading: createLoadingReducer(actionTypes),
    error: createErrorReducer(actionTypes),
    entity: createEntityReducer(actionTypes, entityName),
    entityId: createEntityIdReducer(actionTypes),
    didInvalidate: createDidInvalidateReducer(actionTypes),
    ...additionalReducers
  });

export const createEntityListReducer = (
  actionTypes,
  entityName,
  additionalReducers = {}
) =>
  combineReducers({
    loading: createLoadingReducer(actionTypes),
    error: createErrorReducer(actionTypes),
    entitiesById: createEntitiesByIdReducer(actionTypes, entityName),
    allEntityIds: createAllEntityIdsReducer(actionTypes),
    nextPage: createNextPageReducer(actionTypes),
    lastUpdated: createLastUpdatedReducer(actionTypes),
    didInvalidate: createDidInvalidateReducer(actionTypes),
    ...additionalReducers
  });
