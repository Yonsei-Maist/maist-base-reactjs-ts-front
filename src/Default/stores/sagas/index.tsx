/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.10.26
 */
import * as defaultSaga from './defaultSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        defaultSaga.watchDefault()
    ]);
}