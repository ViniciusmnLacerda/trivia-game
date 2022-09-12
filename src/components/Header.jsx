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
    const { name } = this.props;
    const { endPoint } = this.state;
    return (
      <header>
        <div className="header-title">
          <h1>
            Trivia
            <span>Game</span>
          </h1>
        </div>
        <div className="header-userinfo">
          <img
            src={endPoint}
            alt="Foto de perfil do jogador"
            data-testid="header-profile-picture"
          />
          <h2>{ name }</h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
