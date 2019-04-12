import {
  FETCH_HOUSE_LOTS,
  FETCH_HOUSE_LOTS_SUCCESS,
  FETCH_HOUSE_LOTS_FAIL,
  UPDATE_HOUSE_WATCH_LOTS,
  UPDATE_HOUSE_WATCH_LOTS_SUCCESS,
  UPDATE_HOUSE_WATCH_LOTS_FAIL,
  UPDATE_HOUSE_WATCH_STATE,
  CHECK_HOUSE_WATCH_STATE,
  CHECK_HOUSE_WATCH_STATE_TRUE,
  CHECK_HOUSE_WATCH_STATE_FALSE,
} from '../../constants/Actions';

const initialState = {
  isFetching: false,
  isWatching: false,
  houseLots: [],
  houseWatchLots: [],
  page: 0,
  itemsPerPage: 10,
  error: null,
};

const houseLotsReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_HOUSE_WATCH_LOTS:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_HOUSE_WATCH_LOTS_SUCCESS:
      return {
        ...state,
        error: null,
        houseWatchLots: [...action.payload.message.apartments.onliner.apartments],
        isFetching: false,
      };
    case UPDATE_HOUSE_WATCH_LOTS_FAIL:
      return {
        ...state,
        error: action.error,
        houseWatchLots: [],
        isFetching: false,
      };
    case FETCH_HOUSE_LOTS:
      return {
        ...state,
        houseLots: [],
        isFetching: true,
      };
    case FETCH_HOUSE_LOTS_SUCCESS:
      return {
        ...state,
        error: null,
        houseLots: [...state.houseLots, ...action.payload.message.apartments],
        isFetching: false,
      };
    case FETCH_HOUSE_LOTS_FAIL:
      return {
        ...state,
        error: action.error,
        houseLots: [],
        isFetching: false,
      };
    case UPDATE_HOUSE_WATCH_STATE:
      return {
        ...state,
        isWatching: action.payload,
      };
    case CHECK_HOUSE_WATCH_STATE:
      return {
        ...state,
      };
    case CHECK_HOUSE_WATCH_STATE_TRUE:
      return {
        ...state,
        isWatching: true,
      };
    case CHECK_HOUSE_WATCH_STATE_FALSE:
      return {
        ...state,
        isWatching: false,
        houseWatchLots: [],
      };
    default:
      return state;
  }
};

export default houseLotsReducer;
