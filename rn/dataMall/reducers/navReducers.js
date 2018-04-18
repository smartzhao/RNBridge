/**
 * Created by liwei on 2017/12/15.
 */
import DataMallRouters from '../routers/dataMallRouters';

const recentlyVisitedRoutes = new Set();//防止连点，多次navigate，增加此判断
const navReducers = (state, action) => {
    if (action.type === 'Navigation/NAVIGATE') {
        if (recentlyVisitedRoutes.has(action.routeName)) {
            return state;
        }
        recentlyVisitedRoutes.add(action.routeName);
        setTimeout(() => {
            recentlyVisitedRoutes.delete(action.routeName);
        }, 400);
    }
    const newState = DataMallRouters.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducers;