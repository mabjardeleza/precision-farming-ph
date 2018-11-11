import { takeLatest } from "redux-saga/effects";
import partial from "lodash/partial";

import { performReduxRequest } from "services/api/utils";
import { apiCalls, schemas } from "services/api/barns";
import {
  BARNS,
  barnsActions,
  BARN_STATUS,
  barnStatusActions
} from "../actions";

const requestBarns = partial(
  performReduxRequest,
  apiCalls.getBarnsMock,
  barnsActions,
  schemas.barnsSchemaArray
);

export function* watchRequestBarns() {
  // eslint-disable-line import/prefer-default-export
  console.log('barns requested');
  yield takeLatest(BARNS.REQUEST, requestBarns);
}

const requestBarnStatus = partial(
  performReduxRequest,
  apiCalls.getBarnStatusMock,
  barnStatusActions,
  schemas.barnStatusSchema
);

export function* watchRequestBarnStatus() {
  // eslint-disable-line import/prefer-default-export
  yield takeLatest(BARN_STATUS.REQUEST, requestBarnStatus);
}
