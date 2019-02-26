import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { DangerZone } from 'expo';
import ErrorContainer from '../core/ErrorContainer';
import IcoButton from '../core/IcoButton';

const { Lottie } = DangerZone;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 20,
  },
  lottieLogo: {
    width: '100%',
    height: '40%',
    marginTop: 10,
    marginBottom: 20,
  },
});

class AuthSignOrRegister extends PureComponent {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    const { onSignIn, onSignUp, authError } = this.props;
    return (
      <View style={styles.container}>
        <Lottie
          ref={animation => {
            this.animation = animation;
          }}
          source={require('../../../assets/animation/house.json')}
          autoPlay
          loop={false}
          style={styles.lottieLogo}
        />
        <Text style={[styles.text]}>Please log in using one of your existing accounts:</Text>
        <View style={styles.container}>
          <IcoButton
            text="Google"
            color="#fff"
            onPress={onSignIn}
            textColor="#131313"
            iconColor="#131313"
            iosIcon="logo-google"
            otherIcon="logo-google"
          />
          <IcoButton
            text="Github"
            color="#fff"
            onPress={onSignUp}
            textColor="#131313"
            iconColor="#131313"
            iosIcon="logo-github"
            otherIcon="logo-github"
          />
          <IcoButton
            text="Facebook"
            color="#fff"
            onPress={onSignUp}
            textColor="#131313"
            iconColor="#131313"
            iosIcon="logo-facebook"
            otherIcon="logo-facebook"
          />
          { authError && <ErrorContainer error={authError} /> }
        </View>
      </View>
    );
  }
}

AuthSignOrRegister.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  authError: PropTypes.string,
};

AuthSignOrRegister.defaultProps = {
  authError: null,
};

export default AuthSignOrRegister;
