/**
 * Created by liwei on 2017/12/15.
 */
import nav from './navReducers';
import dataMallData from './dataMallData'
import orderData from './orderData'
import commonData from './commonData'
const rootReducer = {
    nav,
    dataMallData,
    orderData,
    commonData
};
export default rootReducer