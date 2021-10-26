/**
 * set default setting used by application
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05. ~
 * @date 2021.10.26
 */
import {createAction, handleActions} from 'redux-actions';

import {SET_DEFAULT_DATA} from '../types';

// create actions
export const setConfig = createAction(SET_DEFAULT_DATA);

export type SetState = {
    data?: any;
}

const initialState: SetState = {
	data: undefined
};

type SetInputAction = ReturnType<typeof setConfig>;

export default handleActions<SetState, any>({
	[SET_DEFAULT_DATA]: (state, action:SetInputAction) => {
		const {defaultSetting} = action.payload;
        state.data = defaultSetting;
		return state;
	}
}, initialState)