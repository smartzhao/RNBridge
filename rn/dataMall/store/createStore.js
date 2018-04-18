/**
 * Created by liwei on 2017/12/15.
 */
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import { createStore, applyMiddleware,combineReducers } from 'redux'


//定义一个全局的中间件
const middleWares = [
    thunkMiddleware
];
if (__DEV__) {
    //如果是开发模式，就像数组追加一个 Log 记录器
    middleWares.unshift(createLogger());
}

const rootReducer = combineReducers({
    ...reducers
});

const createStoreWithMiddleware = applyMiddleware(
    ...middleWares //解构元素
)(createStore);

//应用中间件，添加一个根 Reducer
const store = createStoreWithMiddleware(rootReducer);

//导出 store
export default store;