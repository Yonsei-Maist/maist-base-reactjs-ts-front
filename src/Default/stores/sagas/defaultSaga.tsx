/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.10.26
 */
import { call, spawn, put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions/defaultAction';
import axios from 'axios';
import { FETCH_DEFAULT } from '../types';

import { DefaultAction } from '../reducers/defaultReducer';

function* fetchDefaultSaga(action: DefaultAction) {
    try {
        const { data } = yield axios.post('default API URL', action.payload);
        yield put(actions.fetchDefualtSuccess(data));
    } catch (error: any) {
        yield put(actions.fetchDefaultFailure(error.response));
    }
}

function* watchDefault() {
    /*
    takeEvery - get
    takeLatest - post, put ,delete
    */
    yield takeEvery(FETCH_DEFAULT, fetchDefaultSaga);
}

export { watchDefault };
