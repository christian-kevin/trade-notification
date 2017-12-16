import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationActions } from 'react-navigation';
import { BackButton } from '../../';
import { SCREEN_WIDTH } from '../../../core/constant';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: '3.8rem', // Might need to standardize this, previously 1.2rem top-bottom padding
  },
  titleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '1.3rem',
    width: SCREEN_WIDTH,
  },
  titleHeader: {
    fontFamily: 'VarelaRound-Regular',
    fontWeight: '200',
    fontSize: '1rem',
    color: '#666',
    width: SCREEN_WIDTH / 1.8,
    textAlign: 'center',
  },
  headerRightContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: '1.2rem',
  },
  headerLeftContainer: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: '1.2rem',
  },
});

const StackHeader = ({
  isElevate,
  navigation,
  headerTitle,
  rightComponent,
  hasBackButton,
  onBackPress,
  leftComponent,
}) => (
  <View style={[styles.container, { elevation: isElevate ? 4 : 0 }]}>
    {hasBackButton ? (
      <BackButton
        onPress={() => {
          if (onBackPress) {
            onBackPress();
          } else {
            navigation.dispatch(NavigationActions.back());
          }
        }}
      />
    ) : (
      <View style={{ height: 20 }} /> // Hack to make the height still same without BackButton
    )}
    {
        leftComponent && !hasBackButton ?
          <View style={styles.headerLeftContainer}>{leftComponent}</View>
            : null
      }
    <View style={styles.titleContainer}>
      <Text numberOfLines={1} style={styles.titleHeader}>
        {headerTitle}
      </Text>
    </View>
    <View style={styles.headerRightContainer}>{rightComponent}</View>
  </View>
);

StackHeader.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  headerTitle: PropTypes.string.isRequired,
  rightComponent: PropTypes.node,
  isElevate: PropTypes.bool,
  hasBackButton: PropTypes.bool,
  onBackPress: PropTypes.func,
};

StackHeader.defaultProps = {
  rightComponent: null,
  isElevate: false,
  hasBackButton: true,
  onBackPress: null,
};

export { StackHeader };
