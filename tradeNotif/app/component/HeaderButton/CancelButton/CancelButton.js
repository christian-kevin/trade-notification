import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  backIcon: {
    fontSize: '1.5rem',
    color: '#333',
  },
  backContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.8rem',
  },
  cancel: {
    fontFamily: '$primaryFont',
    paddingTop: '0.3rem',
    marginRight: 15,
    marginLeft: 15,
  },
});
const isNativeFeedbackSupported = Platform.OS === 'android' && Platform.Version >= 21;

const CancelButton = ({ onPress, textStyle }) => {
  if (isNativeFeedbackSupported) {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', true)}
      >
        <Text style={[styles.cancel, textStyle]}>BATAL</Text>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.cancel, textStyle]}>BATAL</Text>
    </TouchableOpacity>
  );
};

CancelButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  textStyle: Text.propTypes.style,
};

CancelButton.defaultProps = {
  textStyle: null,
};

export { CancelButton };
