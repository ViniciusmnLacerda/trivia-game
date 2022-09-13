import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import { connect } from 'react-redux';
import { endTime, resetTimerAction, stopWatch } from '../redux/actions';

class Timer extends Component {
  componentDidMount() {
    this.myInterval();
  }

  componentDidUpdate() {
    const { stopTimer, resetTimer, dispatch } = this.props;
    if (stopTimer) {
      clearInterval(this.timer);
      clearTimeout(this.timerOut);
    }
    if (resetTimer) {
      dispatch(resetTimerAction());
      this.myInterval();
    }
  }

  myInterval = () => {
    const { dispatch } = this.props;
    const oneSecond = 1000;
    const thirtySeconds = 30000;
    this.timer = setInterval(this.myTimer, oneSecond);
    this.timerOut = setTimeout(() => {
      clearInterval(this.timer);
      dispatch(endTime());
    }, thirtySeconds);
  };

  myTimer = () => {
    const { dispatch } = this.props;
    let { timeLeft } = this.props;
    timeLeft -= 1;
    dispatch(stopWatch(timeLeft));
  };

  render() {
    const { timeLeft } = this.props;
    return (
      <div className="timer-container">
        <BsClockHistory />
        <p>{`${timeLeft} s`}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stopTimer: state.controls.stopTimer,
  resetTimer: state.controls.resetTimer,
  wasAnswered: state.controls.wasAnswered,
  timeLeft: state.controls.timeLeft,
});

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool.isRequired,
  resetTimer: PropTypes.bool.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Timer);
