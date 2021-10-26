import './index.css';
import ReactDOM from 'react-dom';
import DefaultApp from './Default/DefaultApp';
import configureStore from './Default/stores';
import {Provider} from 'react-redux';

import axios from 'axios';

import {setConfig} from './Default/stores/reducers/configReducer'

class Initializer {
    el:any;
    store:any;

	constructor(el:any) {
		this.el = el;
		this.store = configureStore();
	}

    init(tag:string, baseURL: string, defaultSettingData: any): void {
        axios.defaults.baseURL = baseURL;
        axios.interceptors.request.use(
            function (config) {
                config.withCredentials = true;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );

		this.store.dispatch(setConfig({
			defaultSetting: defaultSettingData
		}));

        ReactDOM.render(
            
			<Provider store={this.store}>
                <DefaultApp/>
            </Provider>
            , document.getElementById(tag)
        );
    }
}

export {
    Initializer
}