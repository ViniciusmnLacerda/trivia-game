/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUp } from '../redux/actions';
import '../styles/Settings.css';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      numberOfQuestions: 5,
      category: 'any',
      difficulty: 'any',
      type: 'any',
    };
  }

  componentDidMount() {
    const {
      numberOfQuestions, category, difficulty, type,
    } = this.props;
    this.setState({
      numberOfQuestions,
      category,
      difficulty,
      type,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(setUp({ ...this.state }));
    history.push('/');
  };

  render() {
    const {
      numberOfQuestions, category, difficulty, type,
    } = this.state;
    return (
      <div className="settings-container" data-testid="settings-container">
        <div className="settings-card">
          <div className="settings-title">
            <h1>Settings</h1>
          </div>
          <div className="settings-content">
            <form onSubmit={this.handleClick}>
              <div className="settings-inputs">
                <label htmlFor="numberOfQuestions">
                  Number of Questions
                  <input
                    type="number"
                    name="numberOfQuestions"
                    id="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={this.handleChange}
                    max="50"
                    min="1"
                  />
                </label>
                <label htmlFor="category">
                  Category
                  <select
                    onChange={this.handleChange}
                    name="category"
                    id="category"
                    value={category}
                  >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals &amp; Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                    <option value="32">Entertainment: Cartoon &amp; Animations</option>
                  </select>
                </label>
                <label htmlFor="difficulty">
                  Difficulty
                  <select
                    name="difficulty"
                    id="difficulty"
                    value={difficulty}
                    onChange={this.handleChange}
                  >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
                <label htmlFor="type">
                  Type
                  <select
                    name="type"
                    id="type"
                    value={type}
                    onChange={this.handleChange}
                  >
                    &gt;
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                  </select>
                </label>
              </div>
              <div className="container-btn">
                <button
                  className="save-btn"
                  type="button"
                  onClick={this.handleClick}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  numberOfQuestions: PropTypes.string.isRequired,
  category: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  numberOfQuestions: state.setup.numberOfQuestions,
  category: state.setup.category,
  difficulty: state.setup.difficulty,
  type: state.setup.type,
});

export default connect(mapStateToProps)(Config);
