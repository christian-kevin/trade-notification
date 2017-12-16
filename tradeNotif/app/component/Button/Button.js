import React from 'react';
import { View, Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    onPress,
    borderRadius,
    containerStyle,
    text,
    textStyle,
    iconComponent,
    icon,
    outerContainerStyle,
  } = props;

  const styles = EStyleSheet.create({
    $borderRadius: borderRadius,
    outerWrapperStyle: {
      borderRadius: '$borderRadius',
      overflow: 'hidden',
    },
    contentStyle: {
      flexDirection: 'row',
      borderRadius: '$borderRadius',
    },
  });
  const { contentStyle, outerWrapperStyle } = styles;
  return (
    <TouchableOpacity style={[outerWrapperStyle, outerContainerStyle]} onPress={onPress}>
      <View style={[contentStyle, containerStyle]}>
        {iconComponent}
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconComponent: PropTypes.element,
  textStyle: Text.propTypes.style,
  containerStyle: ViewPropTypes.style,
  outerContainerStyle: ViewPropTypes.style,
  icon: PropTypes.string,
  borderRadius: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Button.defaultProps = {
  text: '',
  icon: '',
  borderRadius: '1rem',
  containerStyle: {},
  outerContainerStyle: {},
  textStyle: {},
  iconComponent: null,
};

export { Button };
