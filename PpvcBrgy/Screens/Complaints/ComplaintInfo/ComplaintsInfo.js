import React, {useEffect, useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
//import Card from 'react-native-rn-Card';
import {Divider, Button, Card} from 'react-native-elements';
import {
  action_get_complaints_info,
  action_get_complaints_messages,
  action_set_complaints_messages,
  action_notify,
} from '../../../Services/Actions/ComplaintsActions';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomBottomSheet from '../../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {ImageBackground} from 'react-native';
import io from 'socket.io-client';
import moment from 'moment';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import settings from '../../../settings.json'; 
const ComplaintsInfo = () => {
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const {width, height} = Dimensions.get('window');
  const [complaint_pk, setcomplaint_pk] = useState('');
  const [sendmessage, setsendmessage] = useState('');
  const [messages, getmessages] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [sendClicked, setsendClicked] = useState(0);
  const [reload_messages, set_reload_messages] = useState(0);
  const [token, settoken] = useState('');
  const [uri, seturi] = useState('');
  const MY_USER_ID = users_reducers?.user_pk;
  const navigation = useNavigation();
  let imageUri = 'data:image/png;base64,' + users_reducers.pic;
  const base_url = useSelector(state => state.NewsReducers.base_url);
  const complaint_id = useSelector(
    state => state.ComplaintsReducers.complaint_id,
  );
  const socketRef = useRef();

  const dispatch = useDispatch();
  const complaint_info = useSelector(
    state => state.ComplaintsReducers.data_info,
  );
  const complaint_messages = useSelector(
    state => state.ComplaintsReducers.data_messages,
  );

  const onChangeMessageText = useCallback(text => {
    setsendmessage(text);
  }, []);

  const onFABPress = useCallback(() => {
    setisVisible(true);
  }, []);
  const handleCloseCommentButton = useCallback(() => {
    setisVisible(false);
  }, []);

  const handleMessageSend = useCallback(async () => {
    await setsendmessage('');
    dispatch(action_set_complaints_messages(sendmessage, complaint_id));

    await setsendClicked(prev => prev + 1);
    dispatch(action_get_complaints_messages(complaint_id));
    socketRef.current.emit('sendMessage', complaint_id);
  }, [dispatch, sendmessage, complaint_id]);
  useEffect(() => {
    let mounted = true;
    const getcomplaintsmessages = () => {
      if (mounted) {
        dispatch(action_get_complaints_messages(complaint_id));
      }
    };
    mounted && getcomplaintsmessages();
    return () => {
      mounted = false;
    };
  }, [dispatch, sendClicked, complaint_id, reload_messages]);

  useEffect(() => {
    let mounted = true;
    const getasyncs = async () => {
      if (mounted) {
        try {
          AsyncStorage.getItem('complaint_pk').then(item => {
            if (item === null) {
              navigation.navigate('Home');
              //Actions.home();
            } else {
              setcomplaint_pk(item);
            }
          });
          AsyncStorage.getItem('tokenizer').then(async item => {
            if (item == null) {
              navigation.navigate('Home');
              //Actions.home();
            } else {
              settoken(item);
            }
          });
        } catch (e) {
          alert('Failed to save the data to the storage');
        }
      }
    };
    mounted && getasyncs();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const socketsio = () => {
      socketRef.current = io(`${settings.BASE_URL}/socket/complaint/chat`, {
        query: {
          token: token,
        },
      });

      socketRef.current.on('connected', data => {
        console.log('this =>' + data);
      });

      socketRef.current.emit('joinRoom', complaint_id);

      socketRef.current.on('allMessage', () => {
        set_reload_messages(prev => prev + 1);
        dispatch(
          action_notify([
            {
              title: 'Message',
              message: 'New Message',
              notify: true,
            },
          ]),
        );
        setTimeout(() => {
          dispatch(
            action_notify([
              {
                title: 'Message',
                message: 'New Message',
                notify: false,
              },
            ]),
          );
        }, 500);
        dispatch(action_get_complaints_messages(complaint_id));
      });

      socketRef.current.on('failedMessage', error => {
        console.log(error);
      });

      return () => {
        socketRef?.current?.disconnect();
      };
    };

    mounted && socketsio();
    return () => (mounted = false);
  }, [complaint_id, token, dispatch, sendmessage]);
  const [gestureName, setgestureName] = useState('');

  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setisVisible(false);

        break;
      case SWIPE_LEFT:
        setisVisible(false);
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <SafeAreaView style={styles.safeareaviewcontainer}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                width: '30%',
                height: 50,
              }}>
              <Image
                source={{uri: imageUri, scale: 1}}
                style={{
                  marginTop: 10,
                  marginStart: 10,
                  width: 50,
                  height: 50,
                  borderRadius: 150 / 2,
                  overflow: 'hidden',
                  borderWidth: 3,
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
              }}>
              <Text style={styles.Titletext}>{users_reducers.full_name}</Text>
            </View>
          </View>
          <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
              }}>
              <Text  style={styles.statusText}>
                Status: 
                <Text style={{color:complaint_info?.status?.sts_color}}>
                  {complaint_info?.status?.sts_desc}
                </Text>
              </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.texttime}>
                Date:{' '}
                {moment(complaint_info?.reported_at).format('MMM D, YYYY')}{' '}
                <Text style={styles.texttime}>
                  Time: {moment(complaint_info?.reported_at).format('HH:mm')}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <Divider style={{backgroundColor: 'grey'}} />
              <Text style={styles.Titletext}>
                Subject: {complaint_info?.title}
              </Text>
              <Text style={styles.Titletext}>
                Type: {complaint_info?.type}
              </Text>
              <Text style={styles.Titletext}>
                Message:
              </Text>
              <Text style={styles.bodyText}>{complaint_info?.body}</Text>
            </View>
          </View>
          <Divider style={{backgroundColor: 'grey'}} />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Divider style={{backgroundColor: 'grey'}} />

            {complaint_info?.complaint_file?.map((item, index) => (
              <View style={{width: 100 + '%'}} key={index}>
                <TouchableNativeFeedback key={index} underlayColor="white">
                  <Card
                    style={styles.avatar}
                    radius={1}
                    backgroundColor={'#ffffff'}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        source={{
                          uri: `${settings.BASE_URL}/${item?.file_path}`,
                        }}
                        style={styles.avatar}
                      />
                    </View>
                  </Card>
                </TouchableNativeFeedback>
              </View>
            ))}
          </View>
        </ScrollView>
        <GestureRecognizer
          onSwipe={(direction, state) => onSwipe(direction, state)}
          config={config}
          style={{
            flex: 1,
          }}>
          <CustomBottomSheet
            isVisible={isVisible}
            color="white"
            UI={
              <ScrollView>
                {complaint_messages.map((Notification, index) => {
                  console.log(Notification?.user?.pic);

                  if (Notification?.sent_by === MY_USER_ID) {
                    return (
                      <View
                        key={index}
                        style={{
                          alignSelf: 'flex-end',
                          maxWidth: width,
                          maxHeight: height,
                        }}>
                        <Card
                          containerStyle={{
                            backgroundColor: '#0099ff',
                          }}
                          borderRadius={20}>
                          <Text style={{color: 'white'}}>
                            Me
                            {'\n'}
                            {Notification?.body}
                          </Text>
                        </Card>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={index}
                        style={{
                          alignSelf: 'flex-start',
                          maxWidth: width,
                          maxHeight: height,
                        }}>
                        <Card
                          containerStyle={{backgroundColor: '#e4e6eb'}}
                          borderRadius={20}>
                          <Text>
                            {Notification?.user?.full_name}
                            {'\n'}
                            {Notification?.body}
                          </Text>
                        </Card>
                      </View>
                    );
                  }

                  {
                    /* <View style={{width: 20 + '%', height: 20}}>
                            {Notification?.user?.pic ? (
                              <Image
                                source={{
                                  uri: `data:image/png;base64,${Notification?.user?.pic}`,
                                }}
                                style={{
                                  marginTop: 10,
                                  marginStart: 10,
                                  width: 50,
                                  height: 50,
                                  borderRadius: 120 / 2,
                                  overflow: 'hidden',
                                  borderWidth: 3,
                                }}
                              />
                            ) : (
                              <Image
                                source={require('../../assets/icons/applogo.jpg')}
                                style={{
                                  marginTop: 10,
                                  marginStart: 10,
                                  width: 50,
                                  height: 50,
                                  borderRadius: 120 / 2,
                                  overflow: 'hidden',
                                  borderWidth: 3,
                                }}
                              />
                            )}
                          </View> */
                  }
                })}
                <View style={{marginTop: 20}}>
                  <View style={styles.containerNOTIFICATION}>
                    <View style={styles.contentNOTIFICATION}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginBottom: 50,
                        }}>
                        <View style={{width: 320, height: 40}}>
                          <TextInput
                            style={{
                              borderWidth: 2,
                              borderColor: '#f7f5f5',
                            }}
                            multiline
                            placeholder="Type Message Here"
                            numberOfLines={4}
                            onChangeText={text => onChangeMessageText(text)}
                            value={sendmessage}
                          />
                        </View>
                        <View style={{width: 50, height: 50, borderRadius: 15}}>
                          <Button
                            style={{borderRadius: 15}}
                            icon={
                              <Icon
                                name="arrow-right"
                                size={20}
                                color="white"
                              />
                            }
                            onPress={() => handleMessageSend()}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            }
          />
        </GestureRecognizer>
        {complaint_info?.status?.sts_pk !=="C"? (  
          <FAB style={styles.fab} icon="comment" onPress={() => onFABPress()} />
        ):null}
    
    </SafeAreaView>

    // </ImageBackground>
  );
};

export default ComplaintsInfo;
