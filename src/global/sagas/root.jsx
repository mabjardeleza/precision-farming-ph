import { all, fork } from "redux-saga/effects";

import rootFarmSaga from "modules/sagas";

export default function* rootSaga() {
  yield all([fork(rootFarmSaga)]);
}
