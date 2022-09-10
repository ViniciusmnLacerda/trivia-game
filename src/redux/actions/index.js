export const LOGIN = 'LOGIN';
export const END_TIME = 'END_TIME';
export const MY_TIMER = 'MY_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TOTAL_SCORE = 'TOTAL_SCORE';
export const TOTAL_ASSERTIONS = 'TOTAL_ASSERTIONS';
export const WAS_ANSWERED = 'WAS_ANSWERED';
export const RESET_TIMER = 'RESET_TIMER';
export const SET_IMAGE = 'SET_IMAGE';
export const RESET_GAME = 'RESET_GAME';
export const SET_UP = 'SET_UP';

export function login(payload) {
  return { type: LOGIN, payload };
}

export function setUp(payload) {
  return { type: SET_UP, payload };
}

export function endTime() {
  return { type: END_TIME };
}

export function stopWatch(timer) {
  return { type: MY_TIMER, payload: timer };
}

export function stopTimer() {
  return { type: STOP_TIMER };
}

export function totalScore(score) {
  return { type: TOTAL_SCORE, payload: score };
}

export function totalAssertions() {
  return { type: TOTAL_ASSERTIONS };
}

export function wasAnsweredAction() {
  return { type: WAS_ANSWERED };
}

export function resetTimerAction() {
  return { type: RESET_TIMER };
}

export function setImage(url) {
  return { type: SET_IMAGE, payload: url };
}

export function resetGame() {
  return { type: RESET_GAME };
}
