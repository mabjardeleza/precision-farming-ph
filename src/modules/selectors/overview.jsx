import {
  createEntityListSelector,
  createSingleEntitySelector
} from "utils/redux";

export const getTodosState = state => state.farm.todos;
export const getTodos = createEntityListSelector(
  "farm.todos.allEntityIds",
  "farm.todos.entitiesById"
);

export const getDailyState = state => state.farm.daily;
export const getDaily = createEntityListSelector(
  "farm.daily.allEntityIds",
  "farm.daily.entitiesById"
);

export const geProgressStatusState = state => state.progressStatus;
export const getProgressStatus = createSingleEntitySelector(
  "farm.progressStatus.entityId",
  "farm.progressStatus.entity"
);

export const geOverviewState = state => state.overview;
export const getOverview = createSingleEntitySelector(
  "farm.overview.entityId",
  "farm.overview.entity"
);
