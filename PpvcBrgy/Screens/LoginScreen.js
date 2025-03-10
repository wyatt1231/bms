import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text,Button, TouchableHighlight, View} from 'react-native';
import {useDispatch} from 'react-redux';
//import {Actions} from 'react-native-router-flux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {action_Login_user} from '../Services/Actions/LoginAction';
import Spinner from 'react-native-loading-spinner-overlay';
import ModernInput from '../components/Forms/ModenInput';
import GradientContainer from '../components/GradientContainer';
import Modal from "react-native-modal";
import settings from '../settings.json'; 

const LoginScreen = () => {
    
  const [isModalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState("");
  const [tapTimes, setTapTimes] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setspinner] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const handleSubmit = useCallback(async () => {
    setspinner(true);
    if (username.trim() === '' || password.trim() === '') {
      alert('username/password is empty');
    } else {
      setspinner(true);
      dispatch(action_Login_user(username.trim(), password))
        .then(res => {
          if (res) {
            setUsername('');
            setPassword('');
            navigation.navigate('Dashboard');
          }
        })
        .catch(err => {
          alert('username/password is incorrect');
        });
    }
    setspinner(false);
  }, [dispatch, username, password]);
  const goToSignup = useCallback(() => {
    navigation.navigate('Sign up');
    //Actions.signup();
  });
  const gotoreset = useCallback(() => {
    navigation.navigate('Reset Password');
    //Actions.resetpassword();
  }, []);
  AsyncStorage.getItem('tokenizer').then(item => {
    console.log('TOKEN', item);
    if (item !== null) {
      navigation.navigate('Dashboard');
      //Actions.index();
    }
  });
  const setBaseApiUrl = async() => {
    settings.BASE_URL = await AsyncStorage.getItem('BASE_API_URL');
  }
  useEffect(() => {
    setBaseApiUrl();
  },[])
  const handleTap = () => {
    const now = Date.now();
    const newTapTimes = [...tapTimes, now].filter(t => now - t < 500); // Keep only taps within 500ms

    if (newTapTimes.length === 3) {
      setModalVisible(true)
      console.log("Triple Tap Detected!");
      setTapTimes([]); // Reset tap counter
    } else {
      setTapTimes(newTapTimes);
    }
  };
  const handleSaveApiURL = async() => {
    await AsyncStorage.setItem('BASE_API_URL', input);
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.plate}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
       <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>Enter Text:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            onChangeText={setInput}
            value={input}
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="OK" onPress={handleSaveApiURL} />
          </View>
        </View>
      </Modal>
       <GradientContainer
       gradientStyle={{}}
        >
          <View style={{flex:1,marginTop:50}}>
        <View style={{marginBottom:50,backgroundColor: 'white',alignSelf: 'center',height:110,width:110,borderRadius:55,alignItems:'center',justifyContent:'center'}}>
        
        <TouchableHighlight onPress={handleTap}>
        <Image
          source={require('../assets/icons/applogo2.png')}
          resizeMode="contain"
          style={styles.image}
        />
        </TouchableHighlight>
        
        <View style={{marginVertical: 5}} />
        </View>
       
          <Text style={styles.textTitle}>Brgy. 37-D Davao City</Text>
          <Text style={styles.textShortTitle}>PPVC</Text>
          <Text style={styles.textSubtitle}>
          People Profiling and Violation Complaint
        </Text>
      <ModernInput
        placeholder="Enter your email"
        value={username}
        onChangeText={text => setUsername(text)}
        icon="mail-outline"
        keyboardType="email-address"
      />
       <ModernInput
        placeholder="Enter your password"
        value={password}
        onChangeText={text => setPassword(text)}
        icon="lock-closed-outline"
        secureTextEntry={true}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '70%',
            padding: 20,
            height: 100,
            alignItems: 'center',
          }}>
          <TouchableHighlight
            style={styles.login}
            onPress={() => handleSubmit()}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableHighlight>
          <Text style={{textAlign: 'center', marginTop: 30, color:'white'}}>
            Not Yet Registered?{' '}
            <Text onPress={() => goToSignup()} style={{color: 'blue',fontWeight:'bold',textDecorationLine:'underline'}}>
              Sign Up
            </Text>
          </Text>
          <Text style={{textAlign: 'center', marginTop: 20}}>
            <Text onPress={() => gotoreset()} style={{color: 'blue',textDecorationLine:'underline'}}>
              Forgot Password
            </Text>
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
        }}></View> */}
        </View>
      </GradientContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10 },
  input: { borderBottomWidth: 1, marginVertical: 10, padding: 5 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around" },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  formContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#623256',
    flexDirection:'column',

  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#623256',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#623256',
  },
  signup: {
    marginTop: 10,
    paddingTop: 10,
    width: '100%',
    height: 50,
    paddingBottom: 20,
    backgroundColor: '#623256',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
  InputContainer: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    padding: 15,
  },
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    borderRadius: 30,
    width: '100%',
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    marginEnd: 30,
    width: '100%',
  },

  inputText: {
    color: 'black',
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    marginLeft: 5,
  },
  image: {
    marginTop:7,
    width: 150, // Set desired width for the logo
    height: 150, // Set desired height for the log
  },

  textSubtitle: {
    fontFamily: 'Open-Sans',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  textShortTitle: {
    fontFamily: 'Open-Sans',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  textTitle: {
    fontFamily: 'Open-Sans',
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
  },
});

export default LoginScreen;
