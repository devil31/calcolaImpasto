export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const RETRIEVE_DATA = 'RETRIEVE_DATA'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const signUp = (email, password) => {
    return async dispatch => {

        const data = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrv7Jr17UR5b6JsAN12W6tKkgmj0qN_SE', {
            email,
            password,
            returnSecureToken: true
        })
        dispatch({ type: SIGNUP, token: data.data.idToken, userId: data.data.localId })
        saveData(data.data.idToken, data.data.localId)
    }
}

export const SignIn = (email, password) => {
    return async dispatch => {
        const data = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrv7Jr17UR5b6JsAN12W6tKkgmj0qN_SE', {
            email,
            password,
            returnSecureToken: true
        })
       
        dispatch({ type: SIGNIN, token: data.data.idToken, userId: data.data.localId })
        saveData(data.data.idToken, data.data.localId)
    }
}

export const logout = () => {
    AsyncStorage.removeItem('userData')
   return {type:LOGOUT}
}

const saveData = (token, userId) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
    }))
}

export const retrieveData = () => {
    return async dispatch => {
        const data = await AsyncStorage.getItem('userData');
        const myData = JSON.parse(data)
        dispatch({ type: RETRIEVE_DATA, token: myData.token, userId: myData.userId })
    }

}