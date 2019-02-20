import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, ActivityIndicator } from 'react-native';

import AuthSignOrRegister from '../components/auth/AuthSignOrRegister';
import { googleAuthorizationConfig } from '../constants/Config';
import actions from '../actions';
import SettingsScreen from '../screens/SettingsScreen';


class AuthSignOrRegisterContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    const { checkIfLoggedIn } = this.props;
    checkIfLoggedIn();
  }

  onSignIn() {
    const { onSignIn } = this.props;
    onSignIn();
  }

  onSignUp() {
    Alert.alert('Sorry, this option is temporary not avalible');
  }

  render() {
    const { isLogging, error, isLoggedIn } = this.props;
    if (isLogging && !isLoggedIn) {
      return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
    }

    if (!isLogging && isLoggedIn) {
      return <SettingsScreen />;
    }

    return <AuthSignOrRegister onSignIn={this.onSignIn} onSignUp={this.onSignUp} error={error} />;
  }
}

function mapStateToProps(state) {
  return {
    isLogging: state.authReducers.isLogging,
    isLoggedIn: state.authReducers.isLoggedIn,
    authToken: state.authReducers.authToken,
    error: state.authReducers.error ? state.authReducers.error : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignIn: () => dispatch(actions.authActions.authorize(googleAuthorizationConfig)),
    checkIfLoggedIn: () => dispatch(actions.authActions.checkIfLoggedIn()),
  };
}

AuthSignOrRegisterContainer.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  checkIfLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLogging: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

AuthSignOrRegisterContainer.defaultProps = {
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignOrRegisterContainer);
