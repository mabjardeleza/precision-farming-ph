import { action, createRequestActionTypes } from "utils/redux";

export const BARNS = createRequestActionTypes("BARNS");
BARNS.SET_DETAIL_ID = "BARNS_SET_DETAIL_ID";

export const barnsActions = {
  request: () => action(BARNS.REQUEST),
  success: data => action(BARNS.SUCCESS, data),
  error: error => action(BARNS.ERROR, error, true),
  invalidate: () => action(BARNS.INVALIDATE),
  setDetailId: id => action(BARNS.SET_DETAIL_ID, id)
};

export const BARN_STATUS = createRequestActionTypes("BARN_STATUS");

export const barnStatusActions = {
  request: () => action(BARN_STATUS.REQUEST),
  success: data => action(BARN_STATUS.SUCCESS, data),
  error: error => action(BARN_STATUS.ERROR, error, true),
  invalidate: () => action(BARN_STATUS.INVALIDATE)
};
