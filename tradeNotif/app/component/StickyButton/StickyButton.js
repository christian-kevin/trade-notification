import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Button } from '../index';
import { dpToRem } from '../../core/util/index';

const styles = EStyleSheet.create({
  outerStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '$primaryColor',
    elevation: 1,
    borderRadius: 0,
    height: dpToRem(60),
  },
  innerStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 0,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: dpToRem(17),
    fontFamily: '$primaryFont',
  },
  disabledStyle: {
    backgroundColor: '$warmGrey',
  },
});

const StickyButton = (props) => {
  const { outerStyle, textStyle, innerStyle, disabledStyle } = styles;
  const { checkoutText, disabled, onPress, containerStyle } = props;
  return disabled ? (
    <View style={outerStyle}>
      <View style={[outerStyle, disabledStyle]}>
        <View style={innerStyle}>
          <Text style={textStyle}>{checkoutText}</Text>
        </View>
      </View>
    </View>
  ) : (
    <Button
      outerContainerStyle={[outerStyle, containerStyle]}
      containerStyle={innerStyle}
      textStyle={textStyle}
      onPress={onPress}
      text={checkoutText}
    />
  );
};

StickyButton.propTypes = {
  checkoutText: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  containerStyle: View.propTypes.style,
};
StickyButton.defaultProps = {
  checkoutText: 'loading...',
  onPress: () => null,
  disabled: false,
  containerStyle: null,
};

export { StickyButton };
