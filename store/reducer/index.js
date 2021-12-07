
import { combineReducers } from "redux";

import start from './start'
import authUser from './authUser'


const rootReducer = combineReducers({
    start,
    authUser,
})

export default rootReducer