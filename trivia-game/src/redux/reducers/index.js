import { combineReducers } from 'redux';
import controls from './controls';
import player from './player';
import setup from './setup';

const rootReducer = combineReducers({ player, controls, setup });

export default rootReducer;
