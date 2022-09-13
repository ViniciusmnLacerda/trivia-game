/* eslint-disable comma-dangle */
/* eslint-disable default-param-last */
import {
  LOGIN, RESET_GAME, SET_IMAGE, TOTAL_ASSERTIONS, TOTAL_SCORE
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  image: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        gravatarEmail: action.payload.email,
        name: action.payload.name,
      };
    case RESET_GAME:
      return {
        ...state,
        score: 0,
        assertions: 0,
      };
    case TOTAL_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case TOTAL_ASSERTIONS:
      return {
        ...state,
        assertions: state.assertions + 1,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
}

export default player;
