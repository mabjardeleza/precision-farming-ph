import {
  createSingleEntityReducer,
  createEntityListReducer
} from "utils/redux";
import { schemaNames } from "services/api/overview";

import { OVERVIEW, PROGRESS_STATUS, TODOS, DAILY } from "../actions";

export const overviewReducer = createSingleEntityReducer(
  OVERVIEW,
  schemaNames.OVERVIEW_SCHEMA_NAME
);

export const progressStatusReducer = createSingleEntityReducer(
  PROGRESS_STATUS,
  schemaNames.PROGRESS_STATUS_SCHEMA_NAME
);

export const todosReducer = createEntityListReducer(
  TODOS,
  schemaNames.TODOS_SCHEMA_NAME
);

export const dailyReducer = createEntityListReducer(
  DAILY,
  schemaNames.DAILY_SCHEMA_NAME
);
