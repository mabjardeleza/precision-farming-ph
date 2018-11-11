import { createSelector } from "reselect";
import {
  createEntityListSelector,
  createSingleEntitySelector
} from "utils/redux";

export const getBarnsState = state => state.farm.barns;
export const getBarnDetailId = state => state.farm.barns.detailId;
export const getBarnsEntitiesById = state => state.farm.barns.entitiesById;
export const getBarns = createEntityListSelector(
  "farm.barns.allEntityIds",
  "farm.barns.entitiesById"
);

export const getBarnStatusState = state => state.barnStatus;
export const getBarnStatus = createSingleEntitySelector(
  "farm.barnStatus.entityId",
  "farm.barnStatus.entity"
);

export const getBarn = createSelector(
  [getBarnsEntitiesById, getBarnDetailId],
  (barns, barnId) => (barns[barnId] ? barns[barnId] : null)
);
