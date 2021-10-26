/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.10.26
 */
import { combineReducers } from 'redux';

import config, {SetState} from './configReducer';
import defaultReducer, {DefaultState} from './defaultReducer';

export interface ReduceState {
    config: SetState;
    default: DefaultState;
}

const rootReducer = combineReducers<ReduceState>({
    config: config,
    default: defaultReducer
});

export default rootReducer;