/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsTrophy } from 'react-icons/bs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { resetGame } from '../redux/actions';
import '../styles/Ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      isRedirect: false,
    };
  }

  handleClick = () => {
    const { dispatch } = this.props;
    this.setState({ isRedirect: true }, () => {
      dispatch(resetGame());
    });
  };

  renderRankingList = () => {
    const playersArr = JSON.parse(localStorage.getItem('ranking')) || [];

    return (
      <div className="rank-list">
        {playersArr.length > 0
          && playersArr
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div key={index} className="rank-player">
                <div className="position">
                  {index >= 3 ? (<span>{`${index + 1}º`}</span>) : (<BsTrophy />)}
                </div>
                <div className="name-player">
                  <img src={player.picture} alt="Foto de perfil do jogador" />
                  <p data-testid={`player-name-${index}`}>{player.name}</p>
                </div>
                <div className="score-player">
                  <p data-testid={`player-score-${index}`}>{player.score}</p>
                </div>
              </div>
            ))}
      </div>
    );
  };

  render() {
    const { isRedirect } = this.state;
    if (isRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="ranking-container">
        <Header />
        <div className="ranking-content">
          <div className="ranking-card">
            <header>
              <div className="ranking-title">
                <h2 data-testid="ranking-title">RANKING</h2>
              </div>
              <div className="ranking-subtitle">
                <h3>RANK</h3>
                <h3>PLAYER</h3>
                <h3>SCORE</h3>
              </div>
            </header>
            {this.renderRankingList()}
          </div>
          <div className="ranking-button">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={this.handleClick}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
