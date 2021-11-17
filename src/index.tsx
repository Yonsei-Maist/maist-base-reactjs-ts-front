import './index.css';

import axios from 'axios';
import ReactDOM from 'react-dom';
//import configureStore from './Default/stores';
import { Provider } from 'react-redux';

import DefaultApp from './Default/DefaultApp';
// import { setConfig } from './Default/stores/reducers/configReducer';
import { setConfig } from './Default/rtk/slice/config/configSlice';
import { store } from './Default/rtk/store';

class Initializer {
    el: any;
    store: any;

    constructor(el: any) {
        this.el = el;
        //this.store = configureStore();
        this.store = store;
    }

    init(tag: string, baseUrl: string, defaultSettingData: any): void {
        /* axios.defaults.baseURL = baseURL;
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    ); */

        /* this.store.dispatch(
      setConfig({
        defaultSetting: defaultSettingData,
      })
    ); */
        this.store.dispatch(
            setConfig({
                baseUrl: baseUrl,
                defaultSetting: defaultSettingData,
            })
        );

        ReactDOM.render(
            <Provider store={this.store}>
                <DefaultApp />
            </Provider>,
            document.getElementById(tag)
        );
    }
}

export { Initializer };
