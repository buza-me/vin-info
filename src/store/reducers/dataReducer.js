import {
  SET_DECODE_HISTORY,
  SET_SELECTED_DECODE_RESULTS,
  SET_SELECTED_VARIABLE,
  SET_VARIABLES,
} from 'Constants';

const initialState = {
  decodeHistory: [],
  selectedDecodeResults: null,
  variables: null,
  selectedVariable: null,
};

// eslint-disable-next-line no-unused-vars
export default function dataReducer(state = initialState, { type, payload }) {
  const newState = { ...state };

  switch (type) {
    case SET_DECODE_HISTORY:
      newState.decodeHistory = payload;
      break;
    case SET_SELECTED_DECODE_RESULTS:
      newState.selectedDecodeResults = payload;
      break;
    case SET_SELECTED_VARIABLE:
      newState.selectedVariable = payload;
      break;
    case SET_VARIABLES:
      newState.variables = payload;
      break;
    default:
      break;
  }

  return newState;
}
