import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Header,
  FloatNotification,
  LoadingOverlay,
  QTextInput,
  StickyButton,
} from '../../../component/index';
import { isAuthenticated, dpToRem, isEmptyOrSpaces } from '../../../core/util/index';
import { SCREEN_WIDTH } from '../../../core/constant';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$lightGrey',
    flex: 1,
  },
  linkColor: {
    color: '$primaryColor',
  },
  headerTopContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingTop: '1.5rem',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingBottom: '1.5rem',
    elevation: 5,
  },
  headerTopStyle: {
    fontFamily: '$primaryFont',
    fontWeight: '200',
    fontSize: '1rem',
    color: '#666',
    alignSelf: 'center',
  },
  loginContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '$alto',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  topStyle: {
    fontFamily: '$primaryFont',
    fontWeight: '100',
    fontSize: '1rem',
    color: '$black',
    marginBottom: '1.5rem',
  },
  btnStyle: {
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    paddingLeft: '1.875rem',
    paddingRight: '1.875rem',
    borderRadius: '2rem',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnTextStyle: {
    fontFamily: '$primaryFont',
    fontSize: '0.75rem',
  },
  contentStyle: {
    fontFamily: '$secondaryLightFont',
    fontWeight: '100',
    fontSize: '1rem',
    color: '$brownishGrey',
    textAlign: 'center',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  linkStyle: {
    fontFamily: '$secondaryFont',
    fontSize: '0.85rem',
    color: '$black',
  },
  stickyOuterStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 0,
    height: dpToRem(100),
    width: SCREEN_WIDTH,
  },
});

class Login extends Component {
  // static propTypes = {
  //   authentication: PropTypes.shape({
  //     accessToken: PropTypes.string.isRequired,
  //     isAuthenticating: PropTypes.bool.isRequired,
  //     errorMsg: PropTypes.string.isRequired,
  //   }).isRequired,
  //   navigation: PropTypes.shape({
  //     navigate: PropTypes.func.isRequired,
  //     dispatch: PropTypes.func.isRequired,
  //   }).isRequired,
  //   login: PropTypes.func.isRequired,
  //   loginWithFacebook: PropTypes.func.isRequired,
  // };

  static navigationOptions = ({ navigation }) => {
    const navigate = navigation || null;
    return {
      header: (
          <View style={styles.headerTopContainer}>
            <Text style={styles.headerTopStyle}>LOGIN</Text>
          </View>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
        key: '',
        secret: '',
        errorMsg: {
            key: '',
            secret: '',
        },
        showPassword: false,
        hasAlreadyReset: false,
    };
  }


  setInputField = (inputField, value) => {
    // Set the appropriate state field and clear its error message
    this.setState({
      [inputField]: value,
      errorMsg: Object.assign(this.state.errorMsg, { [inputField]: '' }),
    });
  };

  handleLoginPress = () => {
    const { key, secret } = this.state;

    if (this.verifyInputField()) {
      // this.props.login(key, secret);
    }
  };

  verifyInputField = () => {
    let isValid = true;
    const { key, secret } = this.state;

    if (isEmptyOrSpaces(key)) {
      const errorMsg = Object.assign(this.state.errorMsg, {
        key: 'Mohon masukkan key-mu',
      });
      this.setState({ errorMsg });
      isValid = false;
    }

    if (isEmptyOrSpaces(secret)) {
      const errorMsg = Object.assign(this.state.errorMsg, {
        secret: 'Mohon masukkan secret-mu',
      });
      this.setState({ errorMsg });
      isValid = false;
    }

    return isValid;
  };

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { navigate, state } = this.props.navigation;
    const { errorMsg } = this.state;
    const params = state.params || {};

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={{ padding: 20 }} enableOnAndroid>
          <View style={styles.loginContainer}>
            <QTextInput
              label="Key"
              value={this.state.key}
              placeholder="Your Key"
              returnKeyType="next"
              onChangeText={text => this.setInputField('key', text)}
              errorMsg={errorMsg.key}
              onSubmitEditing={() => this.passwordField.textInput.focus()}
            />

            <QTextInput
              label="Secret"
              value={this.state.secret}
              placeholder="Secret"
              returnKeyType="send"
              onChangeText={text => this.setInputField('secret', text)}
              onSubmitEditing={this.handleLoginPress}
              errorMsg={errorMsg.secret}
              secureTextEntry={!this.state.showPassword}
              icon="eye"
              onIconPress={this.toggleShowPassword}
              ref={(c) => {
                this.passwordField = c;
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <StickyButton checkoutText="LOGIN" onPress={this.handleLoginPress} />
        {/*<FloatNotification*/}
          {/*ref={(c) => {*/}
            {/*this.errorNotification = c;*/}
          {/*}}*/}
          {/*text={this.props.authentication.errorMsg}*/}
          {/*type={FloatNotification.ERROR}*/}
          {/*hideAfterDelay*/}
          {/*hideOnPress*/}
          {/*icon="fault"*/}
        {/*/>*/}
        {/*<FloatNotification*/}
          {/*ref={(c) => {*/}
            {/*this.infoNotification = c;*/}
          {/*}}*/}
          {/*text={params.notificationMessage || ''}*/}
          {/*hideAfterDelay*/}
          {/*hideOnPress*/}
          {/*icon="info"*/}
        {/*/>*/}
        <LoadingOverlay active={false} />
      </View>
    );
  }
}

export { Login };
