/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { resetGame } from '../redux/actions';

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
      <div>
        {playersArr.length > 0
          && playersArr
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div key={index} className="ranking-card">
                <img src={player.picture} alt="Foto de perfil do jogador" />

                <p data-testid={`player-name-${index}`}>{player.name}</p>

                <p data-testid={`player-score-${index}`}>{player.score}</p>
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
      <>
        <Header />
        <div className="ranking-container">
          <h3 data-testid="ranking-title">Ranking</h3>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={this.handleClick}
          >
            Home
          </button>
          <div className="ranking-list">{this.renderRankingList()}</div>
        </div>
      </>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
