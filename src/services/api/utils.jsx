import { put, call } from "redux-saga/effects";
import { camelizeKeys } from "humps";
import { normalize } from "normalizr";

import { getAuthToken } from "../token";

const BASE_HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  Accept: "application/json",
  "Content-Type": "application/json"
};

const config = {
  apiBaseUrl: "http://localhost:8081"
};

export function getFullUrl(endpoint) {
  if (endpoint.indexOf("https://") >= 0 || endpoint.indexOf("http://") >= 0) {
    return endpoint;
  }
  return endpoint.indexOf(config.apiBaseUrl) === -1
    ? `${config.apiBaseUrl}/${endpoint}`
    : endpoint;
}

export function callApi(endpoint, method = "GET", headers = {}, body = "") {
  const fullUrl = getFullUrl(endpoint);
  const params = {
    method,
    headers: {
      ...BASE_HEADERS,
      ...headers
    }
  };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    params.body = body;
    if (body instanceof FormData) {
      delete params.headers["Content-Type"];
    }
  }

  return fetch(fullUrl, params);
}

export function callApiWithToken(
  token,
  endpoint,
  method = "GET",
  headers = {},
  body = ""
) {
  const headerWithToken = {
    ...headers,
    Authorization: `Token ${token}`
  };

  return callApi(endpoint, method, headerWithToken, body);
}

/**
 * Generic function for creating requests linked to redux actions and reducers. This will
 * camelize and normalize the response if a schema is present.
 * @param apiFunction A generic function that will be passed the auth token and returns a response
 * @param entityActions Optional object containing success, and error action creators
 * @param entitySchema An optional schema for normalizing the resulting response
 * @returns {IterableIterator<*>}
 */
export function* performReduxRequest(
  apiFunction,
  entityActions = null,
  entitySchema = null
) {
  try {
    const authToken = yield call(getAuthToken);
    const response = yield call(apiFunction, authToken);

    if (!response.ok) {
      throw new Error(`Response returned with status code: ${response.status}`);
    }

    if (response.status !== 204) {
      const jsonResponse = yield call([response, response.json]);

      const camelizedJson = camelizeKeys(jsonResponse);

      let finalJson = {
        nextPage: camelizedJson.next
      };
      if (entitySchema) {
        finalJson = {
          ...finalJson,
          ...normalize(camelizedJson.results || camelizedJson, entitySchema)
        };
      } else {
        finalJson = {
          ...finalJson,
          ...camelizedJson
        };
      }

      if (entityActions) {
        yield put(entityActions.success(finalJson));
      }

      return { response: finalJson, error: null };
    }

    if (entityActions) {
      yield put(entityActions.success(response));
    }

    return { response, error: null };
  } catch (error) {
    if (entityActions) {
      yield put(entityActions.error(error));
    }
    return { response: null, error };
  }
}
