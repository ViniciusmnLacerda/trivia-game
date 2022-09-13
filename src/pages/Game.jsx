/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BiCheck } from 'react-icons/bi';
import { BsFlagFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Timer from '../components/Timer';
import {
  nextQuestion, resetTimerAction, stopTimer, stopWatch,
  totalAssertions, totalScore, wasAnsweredAction
} from '../redux/actions';
import fetchTrivia from '../services/fetchTrivia';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      trivia: [],
      triviaIndex: 0,
      isRedirect: false,
      toRender: [],
    };
  }

  async componentDidMount() {
    const { triviaIndex } = this.state;
    const {
      numberOfQuestions, category, difficulty, type,
    } = this.props;
    const triviaResponse = await fetchTrivia(numberOfQuestions, category, difficulty, type);
    if (triviaResponse.length === 0) {
      this.setState({ isRedirect: true });
    }
    this.setState({ trivia: triviaResponse }, () => {
      if (triviaIndex === 0) {
        const toRender = this.randomAnswers();
        this.setState({ toRender });
      }
    });
  }

  componentDidUpdate(_props, prevState) {
    const { triviaIndex } = this.state;
    if (triviaIndex !== prevState.triviaIndex) {
      const toRender = this.randomAnswers();
      this.setState({ toRender });
    }
  }

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  handleDifficulty = (difficulty) => {
    const EASY_SCORE = 1;
    const MEDIUM_SCORE = 2;
    const HARD_SCORE = 3;
    switch (difficulty) {
      case 'easy':
        return EASY_SCORE;
      case 'medium':
        return MEDIUM_SCORE;
      case 'hard':
        return HARD_SCORE;
      default:
        break;
    }
  };

  handleClick = (type) => {
    const { dispatch, timeLeft } = this.props;
    let { score } = this.props;
    dispatch(stopTimer());
    dispatch(wasAnsweredAction());
    const { trivia, triviaIndex } = this.state;
    const dificulty = trivia[triviaIndex].difficulty;
    const multiplier = this.handleDifficulty(dificulty);
    const baseScore = 10;
    if (type === 'correct') {
      score += baseScore + (timeLeft * multiplier);
      dispatch(totalAssertions());
    }
    dispatch(totalScore(score));
  };

  randomAnswers = () => {
    const { trivia, triviaIndex } = this.state;
    const { numberOfQuestions } = this.props;
    if (triviaIndex < numberOfQuestions) {
      const {
        correct_answer: correctAnswer, incorrect_answers: incorrectAnswers,
      } = trivia[triviaIndex];
      const answers = [correctAnswer, ...incorrectAnswers];
      let toRender = [];
      const magicNumber = 0.5;
      answers.forEach((element, index) => {
        const assistant = {
          answer: '',
          type: '',
        };
        assistant.answer = element;
        if (index === 0) {
          assistant.type = 'correct';
        } else {
          assistant.type = 'incorrect';
        }
        toRender = [...toRender, assistant];
      });
      toRender = toRender.sort(() => Math.random() - magicNumber);
      return toRender;
    }
  };

  renderQuestions = () => {
    const { trivia, triviaIndex, toRender } = this.state;
    const { numberOfQuestions } = this.props;
    if (triviaIndex < numberOfQuestions) {
      const { question, category } = trivia[triviaIndex];
      const { endOfTime, wasAnswered } = this.props;
      return (
        <div className="game-main">
          <div className="game-text">
            <p className="counter">{`Question ${triviaIndex + 1}/${numberOfQuestions}`}</p>
            <h3
              data-testid="question-category"
              className="trivia-category"
            >
              {this.decodeEntity(category)}
            </h3>
            <h4
              data-testid="question-text"
              className="trivia-question"
            >
              {this.decodeEntity(question)}
            </h4>
          </div>
          <div className="options-container">
            {toRender.map((element, index) => {
              const { answer, type } = element;
              return (
                <div className="button-container" data-testid="answer-options" key={answer}>
                  {type === 'correct' ? (
                    <button
                      disabled={endOfTime || wasAnswered}
                      data-testid="correct-answer"
                      type="button"
                      className={wasAnswered ? 'correct-asnwer' : undefined}
                      onClick={() => this.handleClick(type)}
                    >
                      {this.decodeEntity(answer)}
                    </button>
                  ) : (
                    <button
                      disabled={endOfTime || wasAnswered}
                      data-testid={`wrong-answer-${index}`}
                      type="button"
                      className={wasAnswered ? 'wrong-asnwer' : undefined}
                      onClick={() => this.handleClick(type)}
                    >
                      {this.decodeEntity(answer)}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  handleClickButtonNext = () => {
    const { dispatch, numberOfQuestions } = this.props;
    let { triviaIndex } = this.state;
    const timer = 30;
    if (triviaIndex === numberOfQuestions - 1) {
      const {
        history, name, score, image,
      } = this.props;
      let recovered = JSON.parse(localStorage.getItem('ranking'));
      const player = { name, picture: image, score };
      if (recovered !== null) {
        recovered = [...recovered, player];
        localStorage.setItem('ranking', JSON.stringify(recovered));
      } else {
        recovered = [player];
        localStorage.setItem('ranking', JSON.stringify(recovered));
      }
      history.push('/feedback');
    }
    if (triviaIndex < numberOfQuestions) {
      triviaIndex += 1;
      this.setState({
        triviaIndex,
      }, () => {
        dispatch(wasAnsweredAction());
        dispatch(resetTimerAction());
        dispatch(stopTimer());
        dispatch(stopWatch(timer));
        dispatch(nextQuestion());
      });
    }
  };

  render() {
    const { isRedirect, trivia } = this.state;
    const {
      wasAnswered, endOfTime, score, assertions, numberOfQuestions, timeLeft,
    } = this.props;
    if (isRedirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="game-container">
        <Header />
        <div className="game-content">
          <div className="question-card">
            {trivia.length > 0 && (
              <div className="trivia-container">
                {this.renderQuestions()}
              </div>
            )}
            <div className="progress-bar">
              <div className="percentage" style={{ height: '15px', width: `${timeLeft * (10 / 3)}%` }} />
            </div>
            <div className="footer-card">
              <Timer />
              {(wasAnswered || endOfTime) && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={this.handleClickButtonNext}
              >
                Next
              </button>
              )}
            </div>
          </div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  endOfTime: state.controls.endOfTime,
  timeLeft: state.controls.timeLeft,
  wasAnswered: state.controls.wasAnswered,
  score: state.player.score,
  name: state.player.name,
  image: state.player.image,
  numberOfQuestions: state.setup.numberOfQuestions,
  category: state.setup.category,
  difficulty: state.setup.difficulty,
  type: state.setup.type,
  assertions: state.player.assertions,
});

Game.propTypes = {
  endOfTime: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
  wasAnswered: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
