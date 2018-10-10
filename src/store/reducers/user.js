import { SET_USER } from '../actions/actionTypes'

const initialState = {
  user: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          id: action.payload.id,
          email: action.payload.email,
          photoUrl: action.payload.photoUrl
        }
      }
    default:
      return state
  }
}

export default reducer
