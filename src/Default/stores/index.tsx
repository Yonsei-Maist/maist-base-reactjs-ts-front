/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.10.26
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState?: any) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware),
            (window as any).__REDUX_DEVTOOLS_EXTENSION__
                ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
                : (f: any) => f
        )
    );

    sagaMiddleware.run(saga);
    return store;
}
