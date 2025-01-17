import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';

const CustomBottomSheetV2 = ({open = false}) => {
  const modalizeRef = useRef(Modalize);

  useEffect(() => {
    let mounted = true;
    const index = () => {
      modalizeRef.current?.open();
    };
    mounted && index();
    return () => (mounted = false);
  }, [open]);
  console.log(open);

  return (
    <>
      <Modalize
        ref={modalizeRef}
        snapPoint={500}
        HeaderComponent={
          <View>
            <Text>Header</Text>
          </View>
        }
        withHandle={true}>
        <Text>Context</Text>
      </Modalize>
    </>
  );
};
export default CustomBottomSheetV2;
