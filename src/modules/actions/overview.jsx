import { action, createRequestActionTypes } from "utils/redux";

export const OVERVIEW = createRequestActionTypes("OVERVIEW");

export const overviewActions = {
  request: () => action(OVERVIEW.REQUEST),
  success: data => action(OVERVIEW.SUCCESS, data),
  error: error => action(OVERVIEW.ERROR, error, true),
  invalidate: () => action(OVERVIEW.INVALIDATE)
};

export const PROGRESS_STATUS = createRequestActionTypes("PROGRESS_STATUS");

export const progressStatusActions = {
  request: () => action(PROGRESS_STATUS.REQUEST),
  success: data => action(PROGRESS_STATUS.SUCCESS, data),
  error: error => action(PROGRESS_STATUS.ERROR, error, true),
  invalidate: () => action(PROGRESS_STATUS.INVALIDATE)
};

export const TODOS = createRequestActionTypes("TODOS");

export const todosActions = {
  request: () => action(TODOS.REQUEST),
  success: data => action(TODOS.SUCCESS, data),
  error: error => action(TODOS.ERROR, error, true),
  invalidate: () => action(TODOS.INVALIDATE)
};

export const DAILY = createRequestActionTypes("DAILY");

export const dailyActions = {
  request: () => action(DAILY.REQUEST),
  success: data => action(DAILY.SUCCESS, data),
  error: error => action(DAILY.ERROR, error, true),
  invalidate: () => action(DAILY.INVALIDATE)
};
