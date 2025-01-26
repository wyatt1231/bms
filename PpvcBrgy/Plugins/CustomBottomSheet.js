import React from 'react';
import {BottomSheet} from 'react-native-elements';
import {Dimensions, Modal, ScrollView} from 'react-native';
// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import {View} from 'react-native';
import {Card} from 'react-native-elements/dist/card/Card';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const CustomBottomSheet = ({isVisible, color, UI, Footer, Header}) => {
  //  const  onSwipeUp = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped up!'});
  //   })

  //  const onSwipeDown  = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped down!'});
  //   })

  //   const onSwipeLeft  = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped left!'});
  //   })

  //   const onSwipeRight = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped right!'});
  //   })

  return (
    <BottomSheet
      
      isVisible={isVisible}
      containerStyle={{backgroundColor: color}}>
      <View style={{height: screenHeight}}>{UI}</View>
      <View >{Footer}</View>
    </BottomSheet>
  );
};

CustomBottomSheet.propTypes = {};

export default CustomBottomSheet;
