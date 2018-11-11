import { callApi, callApiWithToken } from "../utils";
import { OVERVIEW } from "./mocks";

const API_OVERVIEW = "api/overview/";

const getOverview = () => callApi(API_OVERVIEW);

const getOverviewMock = () => new Response(OVERVIEW.body, OVERVIEW.init);

export default {
  getOverview,
  getOverviewMock
};
