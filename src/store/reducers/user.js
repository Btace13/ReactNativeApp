import { SET_USER } from '../actions/actionTypes'

const initialState = {
  user: {}
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.userData
      }
    default:
      return state
  }
}

export default user
