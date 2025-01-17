import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {SafeAreaView, TouchableHighlight, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {
  action_forgot_password,
  action_reset_password,
} from '../../Services/Actions/ResidentsActions';
import CustomSnackBar from '../../Plugins/CustomSnackBar';
import wait from '../../Plugins/waitinterval';
//import {Actions} from 'react-native-router-flux';
import {ImageBackground} from 'react-native';
import {Card} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../../Plugins/CustomAlert';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const ResetPassword = () => {
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [currentpassword, setcurrentpassword] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [forgotpassword, setforgotpassword] = useState(false);
  const [message, setmessage] = useState('');
  const [Email, setEmail] = useState('');
  const [reset, setreset] = useState(0);
  const navigation = useNavigation();
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const forgotpassissuccess = useSelector(
    state => state.ResidentReducers.forgotpassissuccess,
  );
  AsyncStorage.getItem('tokenizer').then(item => {
    if (item === null) {
      setforgotpassword(true);
    }
  });
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (reset === 0) {
        setisVisible(false);
      } else {
        wait(1000).then(() => {
          if (forgotpassissuccess.success) {
            setisVisible(true);
            setmessage(forgotpassissuccess.message);
          } else {
            setisVisible(true);
            setmessage(forgotpassissuccess.message);
          }
        });
      }
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [reset, forgotpassissuccess]);
  const handleCurrentPassword = useCallback(
    value => {
      setcurrentpassword(value);
    },
    [currentpassword],
  );
  const handlePassword = useCallback(
    value => {
      setpassword(value);
    },
    [password],
  );
  const handleConfirmPassword = useCallback(
    value => {
      setconfirmpassword(value);
    },
    [confirmpassword],
  );
  const handleEmail = useCallback(
    value => {
      setEmail(value);
    },
    [Email],
  );
  const handleresetbutton = useCallback(() => {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    setreset(prev => prev + 1);
    if (
      password !== confirmpassword ||
      password === '' ||
      confirmpassword === ''
    ) {
      setisVisible(true);
      setmessage('Password Mismatch');
    } else {
      if (reg.test(password)) {
        if (forgotpassword) {
          dispatch(action_forgot_password(Email, password));
          wait(2000).then(() => {
            navigation.navigate('Dashboard');
            //Actions.index();
          });
        } else {
          dispatch(
            action_reset_password(
              users_reducers?.email,
              password,
              currentpassword,
            ),
          );
          wait(2000).then(() => {
            navigation.navigate('Home');
            //Actions.home();
          });
        }
      } else {
        setisVisible(true);
        setmessage(
          'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
        );
      }
    }
    wait(5000).then(() => {
      setisVisible(false);
      setmessage('');
    });
  }, [
    dispatch,
    currentpassword,
    password,
    confirmpassword,
    password,
    isVisible,
  ]);
  return (
    // <ImageBackground
    // style={{flex: 1}}
    // source={require('../../assets/background/bgImage.jpg')}
    // resizeMode="cover"
    // blurRadius={20}>
      <SafeAreaView style={{padding: 20, marginTop: 50}}>
        <ScrollView>
          {forgotpassword ? (
            <TextInput
              theme={{
                colors: {
                  primary: '#623256',
                  background: 'white',
                  underlineColor: 'transparent',
                },
              }}
              mode="outlined"
              onChangeText={text => handleEmail(text)}
              label="Email"
              value={Email}
            />
          ) : (
            <TextInput
              theme={{
                colors: {
                  primary: '#623256',
                  background: 'white',
                  underlineColor: 'transparent',
                },
              }}
              mode="outlined"
              onChangeText={text => handleCurrentPassword(text)}
              label="Current Password"
              secureTextEntry={true}
              value={currentpassword}
            />
          )}
          <TextInput
            theme={{
              colors: {
                primary: '#623256',
                background: 'white',
                underlineColor: 'transparent',
              },
            }}
            mode="outlined"
            onChangeText={text => handlePassword(text)}
            label="New Password"
            secureTextEntry={true}
            value={password}
          />
          <TextInput
            theme={{
              colors: {
                primary: '#623256',
                background: 'white',
                underlineColor: 'transparent',
              },
            }}
            mode="outlined"
            onChangeText={text => handleConfirmPassword(text)}
            label="Confirm Password"
            secureTextEntry={true}
            value={confirmpassword}
          />
          <View style={{width: '100%', padding: 10}}>
            <TouchableHighlight
              style={styles.login}
              underlayColor="#623256"
              onPress={() => handleresetbutton()}>
              <Text style={styles.submitText}>Reset Password</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
        <View
          style={{
            bottom: screenHeight - 900,
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 36,
          }}>
          <CustomAlert
            title={'Change Password'}
            show={isVisible}
            message={message}
          />
        </View>
      </SafeAreaView>
    // </ImageBackground>
  );
};

ResetPassword.propTypes = {};

const styles = StyleSheet.create({
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  login: {
    marginTop: 10,
    paddingTop: 10,
    width: '70%',
    alignSelf: 'center',
    paddingBottom: 20,

    height: 55,
    backgroundColor: '#623256',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#623256',
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default ResetPassword;
