import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const {width: windowscreenWidth, height: windowscreenHeight} =
  Dimensions.get('window');
const BarangayOfficials = () => {
  const dispatch = useDispatch();

  const brgyofficiallist = useSelector(
    state => state.BarangayOfficialReducers.data_barangay,
  );
  const defaultImages = {
    m: require('../../assets/default/male-profile.png'),
    f: require('../../assets/default/female-profile.png'),
  };
  console.log(brgyofficiallist)
  return (
    <ScrollView style={{height: screenHeight}}>
      <SafeAreaView style={{height: screenHeight}}>
        {brgyofficiallist.map((items, index) => {
          return (
            <Card
              style={{
                height: 100,
                backgroundColor: 'white',
                borderColor: 'white',
                borderWidth: 0.1,
                borderRadius: 5,
                elevation: 5,
              }}
              key={index}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{width: screenWidth - 350}}>
                  <Image
                    source={
                      items?.pic?.length > 0 || items?.pic !== null
                        ? {uri: `data:image/png;base64,${items?.pic}`,}
                        : defaultImages[items?.gender] || defaultImages.f}
                    style={{
                      marginTop: 5,
                      marginStart: 10,
                      width: 50,
                      height: 50,
                      borderRadius: 120 / 2,
                      overflow: 'hidden',
                      borderWidth: 3,
                    }}
                  />
                </View>
                <View style={{width: screenWidth - 120}}>
                  <Text style={styles.containerNOTIFICATION}>
                    {items?.first_name} {items?.middle_name} {items?.last_name}{' '}
                    {items?.suffix}
                    {'\n'}
                    {items?.position}
                  </Text>
                </View>
              </View>
            </Card>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  containerNOTIFICATION: {
    paddingLeft: 5,
    paddingRight: 16,
    paddingVertical: 10,
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: '#000000',
  },
  plate: {
    height: 100,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.1,
    borderRadius: 5,
    elevation: 5,
  },
});

export default BarangayOfficials;
