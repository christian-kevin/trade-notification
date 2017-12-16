import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import { dpToRem, memoizeMultiArgs } from '../../core/util';
import { SCREEN_WIDTH } from '../../core/constant';
import { Qicon, Fade } from '../';

const DEFAULT = 'default';
const SUCCESS = 'success';
const WARNING = 'warning';
const ERROR = 'error';

const styles = memoizeMultiArgs((type) => {
  const color = {
    [DEFAULT]: '$primaryColor',
    [SUCCESS]: '$successColor',
    [WARNING]: '$warningColor',
    [ERROR]: '$errorColor',
  };
  return EStyleSheet.create({
    absolute: {
      position: 'absolute',
      width: SCREEN_WIDTH * 0.9,
      top: dpToRem(15),
      left: SCREEN_WIDTH * 0.1 / 2,
      elevation: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outerStyle: {
      width: '90%',
      backgroundColor: color[type],
      borderRadius: 0,
      flexDirection: 'row',
    },
    innerStyle: {
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      borderRadius: 0,
      paddingTop: dpToRem(15),
      paddingBottom: dpToRem(15),
    },
    textStyle: {
      textAlign: 'center',
      color: 'white',
      fontSize: dpToRem(14),
      fontFamily: '$primaryFont',
      flex: 1,
    },
    iconStyle: {
      color: 'white',
      paddingLeft: dpToRem(15),
      paddingRight: dpToRem(15),
    },
  });
});

class FloatNotification extends Component {
  static DEFAULT = DEFAULT;
  static SUCCESS = SUCCESS;
  static WARNING = WARNING;
  static ERROR = ERROR;

  constructor(props) {
    super(props);
    this.styles = styles(this.props.type);
    this.state = {
      visible: false,
    };
    this.onPress = this.onPress.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onPress() {
    const { onPress, hideOnPress } = this.props;
    onPress();
    if (hideOnPress) {
      this.hide();
    }
  }

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  show() {
    const { duration, hideAfterDelay } = this.props;
    if (this.state.visible) return;
    this.setState({ visible: true }, () => {
      setTimeout(() => {
        if (this.mounted && hideAfterDelay) this.hide();
      }, duration);
    });
  }

  hide = () => {
    this.setState({ visible: false });
  };

  renderPrefixIcon() {
    const { icon, iconComponent } = this.props;
    return iconComponent || <Qicon name={icon} style={this.styles.iconStyle} />;
  }
  renderSuffixIcon() {
    const { closeIcon, closeIconComponent } = this.props;
    return closeIconComponent || <Qicon name={closeIcon} style={this.styles.iconStyle} />;
  }

  render() {
    const { outerStyle, textStyle, innerStyle, absolute } = this.styles;
    const { text, customFloatOuterStyle } = this.props;
    const { visible } = this.state;

    return (
      <Fade style={[outerStyle, absolute, customFloatOuterStyle]} visible={visible}>
        <TouchableOpacity onPress={this.onPress} style={innerStyle}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            {this.renderPrefixIcon()}
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.hide} style={{ height: '100%', justifyContent: 'center' }}>
          {this.renderSuffixIcon()}
        </TouchableOpacity>
      </Fade>
    );
  }
}

FloatNotification.propTypes = {
  icon: PropTypes.string,
  closeIcon: PropTypes.string,
  iconComponent: PropTypes.element,
  closeIconComponent: PropTypes.element,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  duration: PropTypes.number,
  hideOnPress: PropTypes.bool,
  hideAfterDelay: PropTypes.bool,
  onPress: PropTypes.func,
};
FloatNotification.defaultProps = {
  icon: 'succeed',
  closeIcon: 'close',
  iconComponent: null,
  closeIconComponent: null,
  type: FloatNotification.DEFAULT,
  // based on https://ux.stackexchange.com/questions/11203/how-long-should-a-temporary-notification-toast-appear
  duration: 3200,
  hideOnPress: false,
  hideAfterDelay: false,
  onPress: () => null,
};

export { FloatNotification };
