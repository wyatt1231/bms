import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, View} from 'react-native';
import {Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
//import Card from 'react-native-rn-Card';
import {TouchableNativeFeedback} from 'react-native';
//import {Actions} from 'react-native-router-flux';
import {ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Settings = () => {
  const navigation = useNavigation();
  const handlePressReset = useCallback(() => {
    navigation.navigate('Reset Password');
    //Actions.resetpassword();
  }, []);
  const handlePressUpdateInfo = useCallback(() => {
    navigation.navigate('Update Information');
    //Actions.updateinfo();
  }, []);
  return (
    // <ImageBackground
    // style={{flex: 1}}
    // source={require('../../assets/background/bgImage.jpg')}
    // resizeMode="stretch"
    // blurRadius={20}>

    <SafeAreaView style={{flex: 1, height: 500, padding: 25}}>
      <View containerStyle={styles.plate}>
        <ScrollView>
          <TouchableNativeFeedback
            style={{
              width: '100%',
              height: 70,
              padding: 20,
              borderRadius: 25,
            }}
            onPress={() => handlePressUpdateInfo()}>
            <Card
              borderRadius={15}
              elevation={15}
              style={{
                width: '100%',
                height: 70,
                padding: 20,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}>
                Update Info
              </Text>
            </Card>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => handlePressReset()}>
            <Card
              borderRadius={15}
              style={{
                width: '100%',
                height: 70,
                padding: 20,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}>
                Reset Password
              </Text>
            </Card>
          </TouchableNativeFeedback>
        </ScrollView>
      </View>
    </SafeAreaView>

    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
});

export default Settings;
