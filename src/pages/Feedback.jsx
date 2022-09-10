import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { resetGame } from '../redux/actions';

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

    const { score, assertions } = this.props;
    const answerThreshold = 3;
    let feedbackMessage = 'Could be better...';
    if (assertions >= answerThreshold) {
      feedbackMessage = 'Well Done!';
    }

    return (
      <>
        <Header />
        <div className="feedback-container">
          <p data-testid="feedback-text" className="feedback-message">
            {feedbackMessage}
          </p>
          <p className="feedback-score">
            {'Total de pontuação: '}
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p className="feedback-questions-answered">
            {'Total de acertos: '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
