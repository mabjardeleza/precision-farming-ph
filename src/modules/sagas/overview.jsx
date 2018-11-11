import { takeLatest, put, call } from "redux-saga/effects";
import { normalize } from "normalizr";

import { performReduxRequest } from "services/api/utils";
import { apiCalls, schemas } from "services/api/overview";
import {
  OVERVIEW,
  overviewActions,
  progressStatusActions,
  todosActions,
  dailyActions
} from "../actions";

function* requestOverview() {
  console.log('start');
  const { response, error } = yield call(
    performReduxRequest,
    apiCalls.getOverviewMock
  );
  console.log(response);
  if (error) {
    yield put(overviewActions.error(error));
  } else {
    const overview = response;
    if (overview.status) {
      const status = normalize(overview.status, schemas.progressStatusSchema);
      yield put(progressStatusActions.success(status));
    }
    if (overview.todos) {
      const todos = normalize(overview.todos, schemas.todosSchemaArray);
      yield put(todosActions.success(todos));
    }
    if (overview.daily) {
      const daily = normalize(overview.daily, schemas.dailySchemaArray);
      yield put(dailyActions.success(daily));
    }
    const overviewNormalized = normalize(overview, schemas.overviewSchema);
    yield put(overviewActions.success(overviewNormalized));
  }
}

export function* watchRequestOverview() {
  // eslint-disable-line import/prefer-default-export
  yield takeLatest(OVERVIEW.REQUEST, requestOverview);
}
