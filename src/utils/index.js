import { VIN_REGEX } from 'Constants';

export const validateVinCode = (vin) => VIN_REGEX.test(vin);

export const clone = (item) => JSON.parse(JSON.stringify(item));

export const throwErrorIfNotValidStatus = (
  response,
  validStatuses,
  getErrorMessage = (resp) => `${resp.status} error`
) => {
  const shouldThrowError = !validStatuses.some((status) => response.status === status);
  if (shouldThrowError) {
    throw new Error(getErrorMessage(response));
  }
};

export const makeRequest = async ({
  url,
  method,
  body,
  headers,
  expectedStatuses,
  getErrorMessage,
}) => {
  const options = {};
  if (method) {
    options.method = method;
  }
  if (body) {
    const withContentType = { 'Content-Type': 'application/json' };
    headers = headers ? { ...withContentType, ...headers } : withContentType;
    options.body = body;
  }
  options.headers = headers;
  const response = await fetch(url, options);

  throwErrorIfNotValidStatus(response, expectedStatuses, getErrorMessage);
  return response;
};

export const createAction = (type) => (payload) => ({
  type,
  payload,
});

export const createAsyncAction = (fn, options) => (payload) => async (dispatch, getState) => {
  const cMap = new Map();

  const cache = {
    set: (key, value) => {
      if (options?.cacheSize && cMap.size >= options.cacheSize) {
        cMap.delete(cMap.keys().next().value);
      }

      cMap.set(key, value);
    },
    get: (key) => cMap.get(key),
    delete: (key) => cMap.delete(key),
    has: (key) => cMap.has(key),
    clear: () => cMap.clear(),
  };

  Object.defineProperty(cache, 'size', {
    configurable: false,
    enumerable: false,
    get: () => cMap.size,
  });

  return fn({ payload, dispatch, getState, cache });
};
