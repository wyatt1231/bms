import React, {useState, useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import PropTypes from 'prop-types';
import AwesomeAlert from 'react-native-awesome-alerts';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const CustomAlert = ({title, message, show = false}) => {
  const [showAlert, setshowAlert] = useState(false);
  const handleCancel = () => {
    setshowAlert(false);
  };
  const handleConfirm = () => {
    setshowAlert(false);
  };
  useEffect(() => {
    let mounted = true;
    const showalerts = () => {
      setshowAlert(show);
    };

    mounted && showalerts();
    return () => (mounted = false);
  }, [showAlert, show]);
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText="Confirm"
      //   confirmButtonColor="#DD6B55"
      onCancelPressed={() => {
        handleCancel();
      }}
      onConfirmPressed={() => {
        handleConfirm();
      }}
    />
  );
};

CustomAlert.propTypes = {};

export default CustomAlert;
