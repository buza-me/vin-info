import { makeRequest, createAction, createAsyncAction } from 'Utils';
import {
  SET_DECODE_HISTORY,
  SET_SELECTED_DECODE_RESULTS,
  SET_SELECTED_VARIABLE,
  SET_VARIABLES,
  DECODE_VIN_URL,
  VARIABLES_URL,
  FORMAT,
  HISTORY_LIMIT,
} from 'Constants';

export const setDecodeHistory = createAction(SET_DECODE_HISTORY);
export const setSelectedDecodeResults = createAction(SET_SELECTED_DECODE_RESULTS);
export const setVariables = createAction(SET_VARIABLES);
export const setSelectedVariable = createAction(SET_SELECTED_VARIABLE);

export const decodeVinAsync = createAsyncAction(
  async ({ payload, dispatch, cache, getState }) => {
    const { decodeHistory } = getState().dataReducer;

    const setValues = (freshItem) => {
      const shortenedHistory =
        decodeHistory.length === HISTORY_LIMIT ? decodeHistory.slice(1) : decodeHistory;
      dispatch(setDecodeHistory([...shortenedHistory, freshItem]));
      dispatch(setSelectedDecodeResults(freshItem));
    };

    if (cache.has(payload)) {
      const cachedResult = cache.get(payload);
      setValues(cachedResult);
      return cachedResult;
    }
    const response = await makeRequest({
      url: `${DECODE_VIN_URL}/${payload}?${FORMAT}`,
      expectedStatuses: [200, 304],
      method: 'GET',
    });
    const parsedResponse = await response.json();

    const decodeResult = {
      of: payload,
      result: parsedResponse,
    };
    cache.set(payload, decodeResult);

    setValues(decodeResult);

    return decodeResult;
  },
  { cacheSize: 10 }
);

export const getVariablesAsync = createAsyncAction(async ({ payload, dispatch, getState }) => {
  const { variables } = getState().dataReducer;
  if (!payload.refresh && variables?.Results) {
    return null;
  }
  const response = await makeRequest({
    url: `${VARIABLES_URL}?${FORMAT}`,
    expectedStatuses: [200, 304],
    method: 'GET',
  });
  const parsedResponse = await response.json();

  dispatch(setVariables(parsedResponse));

  return parsedResponse;
});

export const getSelectedVariableAsync = createAsyncAction(
  async ({ payload, dispatch, cache }) => {
    if (cache.has(payload)) {
      const cachedResult = cache.get(payload);
      dispatch(setSelectedVariable(cachedResult));
      return cachedResult;
    }

    const response = await makeRequest({
      url: `${VARIABLES_URL}/${payload}?${FORMAT}`,
      expectedStatuses: [200, 304],
      method: 'GET',
    });
    const parsedResponse = await response.json();

    cache.set(payload, parsedResponse);
    dispatch(setSelectedVariable(parsedResponse));
    return parsedResponse;
  },
  { cacheSize: 1000 }
);
