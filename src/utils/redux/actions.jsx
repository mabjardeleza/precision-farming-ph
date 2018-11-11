const REQUEST = "REQUEST";
const UPDATE = "UPDATE";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const INVALIDATE = "INVALIDATE";

export function createRequestActionTypes(baseName) {
  const actionTypes = {};
  [REQUEST, UPDATE, SUCCESS, ERROR, INVALIDATE].forEach(actionType => {
    actionTypes[actionType] = `${baseName}_${actionType}`;
  });
  return actionTypes;
}

export function action(type, payload = {}, error, meta) {
  return {
    type,
    payload,
    error,
    meta
  };
}
