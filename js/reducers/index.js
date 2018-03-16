import { combineReducers } from "redux";

import user from './user';
import home from './home';
import notice from './notice';
import wike from './wike';
import attention from './attention';
import intro from './intro';
import jpush from './jpush';
import city from './city';
import search from './search';
const reducers = combineReducers({ user, home, notice, wike, attention, intro, jpush, city, search });
export default reducers;