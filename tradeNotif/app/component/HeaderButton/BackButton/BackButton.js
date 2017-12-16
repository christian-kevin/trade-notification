import React from 'react';
import { View, TouchableOpacity, ViewPropTypes, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Qicon } from '../../';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: '1.3rem',
  },
  backIcon: {
    fontSize: '1.5rem',
    color: '#333',
  },
  backContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.8rem',
  },
});

const BackButton = ({ onPress, containerStyle, backIconStyle }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={[styles.backContainer, containerStyle]}>
      <Qicon name="arrow-left" style={[styles.backIcon, backIconStyle]} />
    </View>
  </TouchableOpacity>
);

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
  backIconStyle: Text.propTypes.style,
};

BackButton.defaultProps = {
  containerStyle: null,
  backIconStyle: null,
};

export { BackButton };
