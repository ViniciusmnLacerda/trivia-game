import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BiCheck } from 'react-icons/bi';
import { BsFlagFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { resetGame } from '../redux/actions';
import '../styles/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      isRedirect: false,
    };
  }

  handleClick = () => {
    this.setState({ isRedirect: true });
  };

  playAgain = () => {
    const { dispatch, history } = this.props;
    dispatch(resetGame());
    history.push('/');
  };

  render() {
    const { isRedirect } = this.state;
    if (isRedirect) {
      return <Redirect to="/ranking" />;
    }

    const { score, assertions, numberOfQuestions } = this.props;
    const answerThreshold = 3;
    let feedbackMessage = 'Could be better...';
    if (assertions >= answerThreshold) {
      feedbackMessage = 'Well Done!';
    }

    return (
      <div className="feedback-container">
        <Header />
        <div className="feedback-content">
          <div className="feedback-card">
            <div className="game-sidecard">
              <div className="score-container">
                <p className="sidecard-title">SCORE</p>
                <div className="sidecard-icon">
                  <BsFlagFill />
                  <p>{`${score} points`}</p>
                </div>
              </div>
              <div className="assertions-container">
                <p className="sidecard-title">ASSERTIONS</p>
                <div className="sidecard-icon">
                  <BiCheck />
                  <p>{`${assertions}/${numberOfQuestions}`}</p>
                </div>
              </div>
            </div>
            <div className="right-section-feedback">
              <div className="feedback-image">
                <img src={assertions >= 3 ? '/first.svg' : '/second.svg'} alt="winners" />
              </div>
              <h3 data-testid="feedback-text" className="feedback-message">
                {feedbackMessage}
              </h3>
              <div className="feedback-buttons">
                <button
                  type="button"
                  data-testid="btn-ranking"
                  onClick={this.handleClick}
                >
                  Ranking
                </button>
                <button
                  data-testid="btn-play-again"
                  type="button"
                  onClick={this.playAgain}
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  numberOfQuestions: state.setup.numberOfQuestions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
