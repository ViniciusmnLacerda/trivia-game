import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setImage } from '../redux/actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      endPoint: '',
    };
  }

  componentDidMount() {
    const { gravatarEmail, dispatch } = this.props;
    const hash = md5(gravatarEmail).toString();
    const endPoint = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(setImage(endPoint));
    this.setState({
      endPoint,
    });
  }

  render() {
    const { name, score } = this.props;
    const { endPoint } = this.state;
    return (
      <div>

        <img
          src={endPoint}
          alt="Foto de perfil do jogador"
          data-testid="header-profile-picture"
        />

        <p data-testid="header-player-name">{ name }</p>

        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
