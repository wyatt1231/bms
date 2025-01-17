import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const CustomSnackBar = ({show, message}) => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!show);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        bottom: screenHeight - 1000,
        right: 0,
        left: 0,
        position: 'absolute',
      }}>
      <Snackbar  duration={3000} visible={show} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
    </View>
  );
};

CustomSnackBar.propTypes = {};

export default CustomSnackBar;
