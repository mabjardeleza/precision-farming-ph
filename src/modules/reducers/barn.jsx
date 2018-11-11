import {
  createSingleEntityReducer,
  createEntityListReducer
} from "utils/redux";
import { schemaNames } from "services/api/barns";

import { BARN_STATUS, BARNS } from "../actions";

function currentBarnReducer(state = -1, action) {
  switch (action.type) {
    case BARNS.SET_DETAIL_ID:
      return action.payload;

    default:
      return state;
  }
}

export const barnStatusReducer = createSingleEntityReducer(
  BARN_STATUS,
  schemaNames.BARN_STATUS_SCHEMA_NAME
);
export const barnsReducer = createEntityListReducer(
  BARNS,
  schemaNames.BARNS_SCHEMA_NAME,
  {
    detailId: currentBarnReducer,
  }
);
