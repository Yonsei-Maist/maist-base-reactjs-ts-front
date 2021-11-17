/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.10.26
 */
import { createAction, handleActions } from 'redux-actions';
import { ResultData } from '../../models/response';

import { FETCH_DEFAULT, FETCH_DEFAULT_SUCCESS, FETCH_DEFAULT_FAILURE } from '../types';

const defaultAction = createAction(FETCH_DEFAULT);
const successAction = createAction(FETCH_DEFAULT_SUCCESS);
const failureAction = createAction(FETCH_DEFAULT_FAILURE);

export type DefaultState = {
    success: boolean;
};

const initialState: DefaultState = {
    success: false,
};

export type DefaultAction = ReturnType<typeof defaultAction>;
export type DefaultSuccessAction = ReturnType<typeof successAction>;
export type DefaultFailureAction = ReturnType<typeof failureAction>;

export default handleActions<DefaultState, any>(
    {
        [FETCH_DEFAULT]: (state, action: DefaultAction) => ({
            success: false,
        }),
        [FETCH_DEFAULT_SUCCESS]: (state, action: DefaultSuccessAction) => ({
            success: true,
        }),
        [FETCH_DEFAULT_FAILURE]: (state, action: DefaultFailureAction) => ({
            success: false,
        }),
    },
    initialState
);
