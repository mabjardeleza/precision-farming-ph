import { all, fork } from "redux-saga/effects";

import { watchRequestBarns, watchRequestBarnStatus } from "./barn";
import { watchRequestOverview } from "./overview";

export default function* rootFarmSaga() {
  yield all([
    fork(watchRequestBarns),
    fork(watchRequestBarnStatus),
    fork(watchRequestOverview)
  ]);
}
