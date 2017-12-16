import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import EStylesheet from 'react-native-extended-stylesheet';
import { Qicon } from '../../';

const styles = EStylesheet.create({
  label: {
    color: '$black',
    fontFamily: '$secondaryBoldFont',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  textInput: {
    backgroundColor: 'white',
    height: '2.6rem',
    borderColor: '$alto',
    borderWidth: 1,
    borderRadius: '1.3rem',
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    fontFamily: '$secondaryFont',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: '1rem',
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 10,
  },
  errorMsg: {
    fontFamily: '$secondaryFont',
    color: '$errorColor',
    fontSize: '0.85rem',
    marginTop: '-0.5rem',
    marginBottom: '1rem',
  },
});

class QTextInput extends Component {
  render() {
    const {
      label,
      placeholder,
      returnKeyType,
      onSubmitEditing,
      onChangeText,
      value,
      keyboardType,
      errorMsg,
      secureTextEntry,
      editable,
      autoFocus,
      multiline,
      numberOfLines,
      onSelectionChange,
      containerStyle,
      labelStyle,
      textInputStyle,
      icon,
      iconColor,
      iconSize,
      onIconPress,
    } = this.props;
    return (
      <View style={containerStyle}>
        {label.length > 0 ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
        <View>
          <TextInput
            style={[styles.textInput, textInputStyle]}
            placeholder={placeholder}
            placeholderTextColor="#999"
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            editable={editable}
            autoFocus={autoFocus}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onSelectionChange={onSelectionChange}
            ref={(c) => {
              this.textInput = c;
            }}
          />
          {icon.length > 0 ? (
            // TODO: don't make it overlap if content is too long
            <TouchableOpacity style={styles.icon} onPress={onIconPress}>
              <Qicon name={icon} size={iconSize} color={iconColor} />
            </TouchableOpacity>
          ) : null}
        </View>
        {errorMsg.length > 0 ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
      </View>
    );
  }
}

QTextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad']),
  errorMsg: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onSelectionChange: PropTypes.func,
  containerStyle: View.propTypes.style,
  labelStyle: Text.propTypes.style,
  textInputStyle: TextInput.propTypes.style,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onIconPress: PropTypes.func,
};

QTextInput.defaultProps = {
  label: '',
  returnKeyType: 'done',
  onSubmitEditing: () => null,
  keyboardType: 'default',
  errorMsg: '',
  secureTextEntry: false,
  editable: true,
  autoFocus: false,
  multiline: false,
  numberOfLines: 1,
  onSelectionChange: () => null,
  containerStyle: null,
  labelStyle: null,
  textInputStyle: null,
  icon: '',
  iconColor: '#999',
  iconSize: 16,
  onIconPress: () => null,
};

export { QTextInput };
