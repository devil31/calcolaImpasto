import {START} from '../actions/start'
const initialState = {
    Statestart:[]
}

const Start = (state=initialState, action)=>{
  switch(action.type){
    case START:

    const firstLaunch = action.value;

    return{
      ...state,
      Statestart:[...state.Statestart,firstLaunch]
    }
      default:
          return state;

  }
}


export default Start