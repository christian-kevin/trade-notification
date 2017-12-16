import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '$alto',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
});

// See here for usage example: https://github.com/Riglerr/react-native-hr
class HorizontalLine extends Component {
  renderLine = key => <View key={key} style={[styles.line, this.props.lineStyle]} />;

  renderText = key => (
    <View key={key}>
      <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
    </View>
  );

  renderInner = () => {
    if (!this.props.text) {
      return this.renderLine();
    }
    return [this.renderLine(1), this.renderText(2), this.renderLine(3)];
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.containerStyle,
          {
            marginLeft: this.props.marginLeft,
            marginRight: this.props.marginRight,
          },
        ]}
      >
        {this.renderInner()}
      </View>
    );
  }
}

HorizontalLine.propTypes = {
  containerStyle: View.propTypes.style,
  lineStyle: View.propTypes.style,
  textStyle: PropTypes.number,
  text: PropTypes.string,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
};

HorizontalLine.defaultProps = {
  containerStyle: null,
  lineStyle: null,
  textStyle: null,
  text: '',
  marginLeft: 0,
  marginRight: 0,
};

export { HorizontalLine };
