import { put, takeLatest, call } from 'redux-saga/effects';
import LMapi from '../../helpers/lmapi';
import actions from '../actions/index';
import { navigate } from '../actions/navigationActionCreators';

import { HOUSE_WATCH_LOTS_SCREEN } from '../../constants/Routes';
import {
  UPDATE_HOUSE_WATCH_STATE,
  CHECK_HOUSE_WATCH_STATE,
  UPDATE_HOUSE_WATCH_FILTER_APPLY,
} from '../../constants/Actions';

function* checkWatchHouseLotsState() {
  try {
    const res = yield call(LMapi.getCurrentUserJobs);
    if (res && res.length > 0) {
      yield put(actions.houseLotsActions.watchHouseLotsTrue());
    } else {
      yield put(actions.houseLotsActions.watchHouseLotsFalse());
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function* watchHouseLots(action) {
  try {
    if (!action.payload) {
      yield call(LMapi.stopAllCurrentUserJobs);
      yield call(checkWatchHouseLotsState);
    } else {
      yield put(actions.houseLotsActions.watchHouseLotsTrue());
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function* updateHouseWatchFilterApply(action) {
  try {
    const { filters } = action.payload;
    const rooms = [];
    for (let i = parseInt(filters.roomsFrom, 10); i < parseInt(filters.roomsTo, 10) + 1; i += 1) {
      rooms.push(i);
    }
    const params = {
      rooms,
      max: parseInt(filters.priceTo, 10),
      min: parseInt(filters.priceFrom, 10),
    };
    LMapi.startCurrentUserJob(params);
    yield call(checkWatchHouseLotsState);
    yield put(navigate(HOUSE_WATCH_LOTS_SCREEN));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

export function* watchHouseLotsSaga() {
  yield takeLatest(UPDATE_HOUSE_WATCH_STATE, watchHouseLots);
}

export function* checkWatchHouseLotsStateSaga() {
  yield takeLatest(CHECK_HOUSE_WATCH_STATE, checkWatchHouseLotsState);
}

export function* updateHouseWatchFilterApplySaga() {
  yield takeLatest(UPDATE_HOUSE_WATCH_FILTER_APPLY, updateHouseWatchFilterApply);
}
