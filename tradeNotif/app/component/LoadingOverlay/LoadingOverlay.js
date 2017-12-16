import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '$black',
    fontFamily: '$secondaryFont',
  },
});

const LoadingOverlay = ({ active }) => {
  if (active) {
    return (
      <Modal visible transparent onRequestClose={() => null}>
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Spinner size={50} type={'ThreeBounce'} color={'#00b4ac'} />
            <Text style={styles.text}>Mohon tunggu sebentar...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  return null;
};

LoadingOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
};

export { LoadingOverlay };
