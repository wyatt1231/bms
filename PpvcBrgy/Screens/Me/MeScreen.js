import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from 'react-native';
import {Card} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
//import Card from 'react-native-rn-Card';
//import {Actions} from 'react-native-router-flux';
import {useNavigation} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';
import {action_netinfo} from '../../Services/Actions/DefaultActions';
import {action_upadatenewuser} from '../../Services/Actions/ResidentsActions';
import {action_get_userinfo} from '../../Services/Actions/UserInfoActions';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MeScreen = () => {
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const netinformation = useSelector(state => state.Default_Reducer.netinfo);
  const new_user = useSelector(state => state.Default_Reducer.new_user);
  const [username, setUsername] = useState('');
  const [premid, setpremid] = useState('');
  const [fullname, setFullname] = useState('');
  const [tick, settick] = useState(0);
  const [value, setValue] = useState(false);
  const [getImage, setImage] = useState();
  const mountedRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  //   AsyncStorage.getItem('tokenizer').then((item) => {
  //     if (item == null) {
  //       //Actions.home();
  //     }
  //   });
  //   AsyncStorage.getItem('username').then((item) => {
  //     if (item == null) {
  //       //Actions.home();
  //     }
  //     setUsername(item);
  //     setValue(false);
  //   });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      // backgroundColor:"#623256"
    },
    plate: {
      flex: 1,
      backgroundColor: 'rgba(255,255,355,0.5)',
      borderColor: 'rgba(255,255,355,0.5)',
      borderWidth: 0.1,
      borderRadius: 5,
    },
  });
  const removeValue = async () => {
    try {
      await AsyncStorage.getAllKeys().then(keys =>
        AsyncStorage.multiRemove(keys),
      );
      navigation.navigate('Home');
      //await //Actions.index();home();
    } catch (e) {
      AsyncStorage.multiRemove(keys);
    }
  };

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(200).then(() => {
      dispatch(action_get_userinfo());
      dispatch(action_netinfo());
      setRefreshing(false);
    });
  }, [dispatch, netinformation]);
  const handleYesAction = useCallback(() => {
    dispatch(action_upadatenewuser(users_reducers?.user_pk,'true'));
    dispatch(action_get_userinfo());
    navigation.navigate('Family Assessment Data Form');
    //Actions.fad();
  }, [dispatch, users_reducers?.user_pk]);
  const handleNoAction = useCallback(() => {
    dispatch(action_upadatenewuser(users_reducers?.user_pk,'false'));
    dispatch(action_get_userinfo());
  }, [dispatch, users_reducers?.user_pk]);
  useEffect(() => {
    let mounted = true;
    const checknew_user = async () => {
      if (mounted) {
        if (new_user) {
          Alert.alert(
            'Famaily Assessment Data',
            'Are you the head of the family?',
            [
              {
                text: 'Yes',
                onPress: () => handleYesAction(),
                style: 'cancel',
              },
              {text: 'No', onPress: () => handleNoAction()},
            ],
          );
        }
      }
    };
    mounted && checknew_user();
    return () => {
      mounted = false;
    };
  }, [new_user]);

  const gotocomplaints = useCallback(() => {
    navigation.navigate('List of Complaints');
    //Actions.complaints();
  }, []);
  const gotonews = useCallback(() => {
    navigation.navigate('News');
    //Actions.newsfeed();
  }, []);
  const gotoposts = useCallback(() => {
    //Actions.posts();
    console.log(navigation);
    navigation.navigate('Posts');
  }, []);
  const gotobrgy = useCallback(() => {
    navigation.navigate('Officials');
    //Actions.officials();
  }, []);
  const gotofad = useCallback(() => {
    console.log(!users_reducers?.new_user);
    if (users_reducers?.ulo_pamilya === null) {
      Alert.alert(
        'Famaily Assessment Data',
        'Your are not the head of the family',
      );
      //Actions.fad();
    } else if (users_reducers?.ulo_pamilya !== null) {
      if (users_reducers?.new_user !== true) {
        // Alert.alert(
        //   'Famaily Assessment Data',
        //   'Assessment data has already been submitted.',
        // );
        Alert.alert(
          'Famaily Assessment Data',
          'Assessment data has already been submitted. Do you want to update your data?',
          [
            {
              text: 'Yes',
              onPress: () => handleUpdateAssessment(),
              style: 'cancel',
            },
            {text: 'No'},
          ],
        );
      } else {
        navigation.navigate('Family Assessment Data Form');
      }
    }
  }, [users_reducers]);
  const handleUpdateAssessment = useCallback(() =>{
    dispatch(action_upadatenewuser(users_reducers?.user_pk,'true'));
    dispatch(action_get_userinfo());
    navigation.navigate('Family Assessment Data Form');
  }, [dispatch, users_reducers?.user_pk]);
  const gotosettings = useCallback(() => {
    navigation.navigate('Settings');
    //Actions.settings();
  }, []);
  const gotoinfo = useCallback(() => {
    navigation.navigate('My Profile');
    //Actions.profile();
  }, []);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  console.log(users_reducers);
  useEffect(() => {
    let mounted = true;
    const getprem_image = async () => {
      if (mounted) {
        if (users_reducers?.user_pk !== '') {
          SplashScreen.hide();
        }
          setImage('data:image/png;base64,' + users_reducers?.pic);
   
        // source={require('@expo/snack-static/react-native-logo.png')}
      }
    };
    mounted && getprem_image();
    return () => {
      mounted = false;
    };
  }, [users_reducers]);
  const defaultImages = {
    m: require('../../assets/default/male-profile.png'),
    f: require('../../assets/default/female-profile.png'),
  };
  return (
    <ScrollView
      style={{height: screenHeight}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/background/bgImage.jpg')}
        resizeMode="stretch"
        blurRadius={20}> */}
      {/* <Card containerStyle={styles.plate}> */}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            height: screenHeight,

            padding: 15,
          }}>
          <TouchableHighlight
            underlayColor="#1C00ff00"
            onPress={() => gotoinfo()}>
            <Card containerStyle={{borderRadius:15,elevation:5}} backgroundColor={'#ffffff'} elevation={25}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '30%', height: 100, margin: 5}}>
                <Image
                  style={{
                    marginTop: 10,
                    marginStart: 10,
                    width: 80,
                    height: 80,
                    borderRadius: 80 / 2, // Simplified calculation
                    overflow: 'hidden',
                    borderWidth: 3,
                  }}
                  source={
                    users_reducers?.pic?.length > 0 || users_reducers?.pic !== null
                      ? { uri: getImage, scale: 1 }
                      : defaultImages[users_reducers.gender] || defaultImages.f                  }
                />
                </View>
                {users_reducers.last_name !== undefined ? (
                <View
                  style={{
                    width: '60%',
                    height: 100,
                    justifyContent: 'center',
                  }}>
                    <Text style={{textAlign: 'justify', fontSize: 22}}>
                      {users_reducers.last_name}
                      {','}
                      {users_reducers.first_name}
                    </Text>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 16,
                      textTransform: 'capitalize',
                    }}>
                    {users_reducers?.user_type}
                  </Text>
                </View>
                 ): (
                  <ActivityIndicator  style={{width:"40%"}} size="large" />
                )}
              </View>
            </Card>
          </TouchableHighlight>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotonews()}
                underlayColor="white">
                <Card containerStyle={{borderRadius:15,elevation:5}}  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: 50,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../../assets/icons/news.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        News
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            </View>

            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotoposts()}
                underlayColor="white">
                <Card containerStyle={{borderRadius:15,elevation:5}} backgroundColor={'#ffffff'} elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,

                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: 50,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../../assets/icons/logs.jpg')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Posts
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotocomplaints()}
                underlayColor="white">
                <Card containerStyle={{borderRadius:15,elevation:5}} backgroundColor={'#ffffff'} elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: 50,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../../assets/icons/complaints.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Complaints
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            </View>

            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotofad()}
                underlayColor="white">
                <Card containerStyle={{borderRadius:15,elevation:5}} backgroundColor={'#ffffff'} elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: 50,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../../assets/icons/ic_admission_prem-playstore.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Family Assessment Data
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotobrgy()}
                underlayColor="white">
                <Card containerStyle={{borderRadius:15,elevation:5}} backgroundColor={'#ffffff'} elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: 50,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../../assets/icons/officials.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Brgy. Officials
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            </View>

            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotosettings()}
                underlayColor="white">
                <Card containerStyle={{borderRadius:15,elevation:5}} backgroundColor={'#ffffff'} elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: 50,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../../assets/icons/settings.webp')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Settings
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => removeValue()}
                underlayColor="white">
                <Card containerStyle={{borderRadius:15,elevation:5}} backgroundColor={'#ffffff'} elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: 50,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../../assets/icons/ic_logout_prem-playstore.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Logout
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      {/* </Card> */}
      {/* </ImageBackground> */}
    </ScrollView>
  );
};

export default MeScreen;
