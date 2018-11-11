import { callApi, callApiWithToken } from "../utils";
import { BARNS, BARN_STATUS } from "./mocks";

const API_BARNS = "api/barns/";
const API_BARN_STATUS = "api/barn-status";

const getBarns = token => callApiWithToken(token, API_BARNS);

const getBarnsMock = () => new Response(BARNS.body, BARNS.init);

const getBarnStatus = token => callApiWithToken(token, API_BARN_STATUS);

const getBarnStatusMock = () =>
  new Response(BARN_STATUS.body, BARN_STATUS.init);

export default {
  getBarns,
  getBarnsMock,
  getBarnStatus,
  getBarnStatusMock
};
