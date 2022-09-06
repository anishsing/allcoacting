
import * as actionTypes from "./types";
import { combineReducers } from "redux";

const initial_ins_state={
    authStatus:false,
    insDetails:{}
}

const ins_reducer=(state=initial_ins_state,action)=>
{
    switch (action.type) {
        case actionTypes.SET_INSTITUTE_DETAILS:
            return{
                ...state,
                insDetails: action.payload.insDetails,
            }
        case actionTypes.SET_AUTH_STATUS:
            return{
                ...state,
                authStatus: action.payload.authStatus,
            }
        default:return state
    }
}





const rootReducer = combineReducers({
     ins:ins_reducer
})


export default rootReducer