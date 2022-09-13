/* eslint-disable comma-dangle */
/* eslint-disable default-param-last */
import {
  END_TIME, MY_TIMER, NEXT_QUESTION, RESET_GAME,
  RESET_TIMER,
  STOP_TIMER,
  WAS_ANSWERED
} from '../actions';

const INITIAL_STATE = {
  timeLeft: 30,
  stopTimer: false,
  resetTimer: false,
  endOfTime: false,
  wasAnswered: false,
};

function controls(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MY_TIMER:
      return {
        ...state,
        timeLeft: action.payload,
      };
    case STOP_TIMER:
      return {
        ...state,
        stopTimer: !state.stopTimer,
      };
    case END_TIME:
      return {
        ...state,
        endOfTime: true,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        endOfTime: false,
        wasAnswered: false,
        stopTimer: false,
      };
    case RESET_TIMER:
      return {
        ...state,
        resetTimer: !state.resetTimer,
      };
    case RESET_GAME:
      return {
        ...state,
        stopTimer: false,
        resetTimer: false,
        endOfTime: false,
        wasAnswered: false,
        timeLeft: 30,
      };
    case WAS_ANSWERED:
      return {
        ...state,
        wasAnswered: !state.wasAnswered,
      };
    default:
      return state;
  }
}

export default controls;
