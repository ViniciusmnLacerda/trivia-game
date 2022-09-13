/* eslint-disable default-param-last */
import { SET_UP } from '../actions';

const INITIAL_STATE = {
  numberOfQuestions: 5,
  category: 'any',
  difficulty: 'any',
  type: 'any',
};

function setup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_UP:
      return {
        ...state,
        numberOfQuestions: action.payload.numberOfQuestions,
        category: action.payload.category,
        difficulty: action.payload.difficulty,
        type: action.payload.type,
      };
    default:
      return state;
  }
}

export default setup;
