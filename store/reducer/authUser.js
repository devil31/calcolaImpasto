import { SIGNUP, SIGNIN,RETRIEVE_DATA,LOGOUT } from '../actions/authUser'

const initialState = {
    token: null,
    userId: null,  
}

const authUser = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                token: action.token,
                userId: action.userId,              
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
            }
            case LOGOUT:
                return initialState
            case RETRIEVE_DATA:
                return{
                    token:action.token,
                    userId:action.userId,
                }
        default:
            return state
    }
}

export default authUser

