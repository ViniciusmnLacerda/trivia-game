import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import fetchToken from '../services/fetchToken';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  };

  validate = () => {
    const { name, email } = this.state;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isLoginValid = [
      emailRegex.test(email),
      name.length > 2,
    ].every(Boolean);
    this.setState({ isDisabled: !isLoginValid });
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    const token = await fetchToken();
    localStorage.setItem('token', token);
    dispatch(login({ name, email }));
    history.push('/game');
  };

  configClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Name
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={isDisabled}
            onClick={this.handleClick}
          >
            Play
          </button>
          <button
            type="button"
            onClick={this.configClick}
            data-testid="btn-settings"
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
