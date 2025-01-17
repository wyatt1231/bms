import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Button, Overlay, Text} from 'react-native-elements';
const CustomOverLay = ({overlayvisible, message}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(false);
  };
  useEffect(() => {
    console.log(overlayvisible);
  }, [overlayvisible]);
  return (
    <Overlay
      fullscreen={false}
      isVisible={overlayvisible}
      onBackdropPress={toggleOverlay}>
      <Text>{message}</Text>
    </Overlay>
  );
};

export default CustomOverLay;
