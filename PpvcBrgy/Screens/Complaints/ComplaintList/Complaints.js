import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {Button, Divider, Icon, Input, Card} from 'react-native-elements';

import {FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
//import Card from 'react-native-rn-Card';
// import { Actions } from 'react-native-router-flux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Icons from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import CustomBottomSheet from '../../../Plugins/CustomBottomSheet';
import CustomFlexBox from '../../../Plugins/CustomFlexBox';
import wait from '../../../Plugins/waitinterval';
import {
  action_get_complaint_id,
  action_get_complaints,
  action_insert_complaints,
} from '../../../Services/Actions/ComplaintsActions';
import styles from './style';
export async function requestStoragePermission() {
  if (Platform.OS !== 'android') return true;

  const pm1 = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  const pm2 = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );

  if (pm1 && pm2) return true;

  const userResponse = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  if (
    userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
    userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
  ) {
    return true;
  } else {
    return false;
  }
}
const Complaints = () => {
  const complaintslist = useSelector(state => state.ComplaintsReducers.data);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const [isVisible, setIsVisible] = useState(false);
  const [subjecttext, setsubjecttext] = useState('');
  const [complaintmessage, setcomplaintmessage] = useState('');
  const [overlayopen, setoverlayopen] = useState(false);
  const [complaintResource, setcomplaintResource] = useState([]);
  const [complaintsimagepath, setcomplaintsimagepath] = useState(null);
  const [singleFile, setSingleFile] = useState([]);
  const [overlaymessage, setoverlaymessage] = useState('');
  const [reported_by, setreported_by] = useState('');
  const [others, setOther] = useState(false);
  const [complaintType, setComplaintType] = useState("");
  const [complaintTypeOther, setComplaintTypeOther] = useState("");

  

  const [complaintlists, setcomplaintlist] = useState([...complaintslist]);
  const navigation = useNavigation();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_complaints(users_reducers?.user_pk));
    });
  }, [dispatch, users_reducers?.user_pk]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setOther(false)
      if (complaintslist.length > 0) {
        complaintlists.sort((obj1, obj2) => {
          return obj2.complaint_pk - obj1.complaint_pk;
        });
        setcomplaintlist([...complaintlists]);
      }
    }

    return () => {
      mounted = false;
    };
  }, [complaintslist]);
  const gotocomplaints = useCallback(
    async item => {
      dispatch(action_get_complaint_id(item?.complaint_pk.toString()));
      await AsyncStorage.setItem('complaint_pk', item?.complaint_pk.toString());
      wait(200).then(() => {
        navigation.navigate('Complaint Info');
        //Actions.complaintsinfo();
      });
    },
    [dispatch],
  );
  const handleFloatingIcon = useCallback(value => {
    setIsVisible(true);
  });
  const handleSubject = useCallback(text => {
    setsubjecttext(text);
  });
  const handleComplaintmessage = useCallback(text => {
    setcomplaintmessage(text);
  });
  const handleSendButton = useCallback(async () => {
    if (complaintmessage === '' || subjecttext === '') {
      // setoverlayopen(true);
      alert('Please Fill all fields');
    } else {
      let setComplaintType = others ? complaintTypeOther:complaintType;
      dispatch(
        action_insert_complaints(subjecttext, complaintmessage,setComplaintType, singleFile),
      );
      wait(1000).then(() => {
        dispatch(action_get_complaints(users_reducers?.user_pk));
      });
      setIsVisible(false);
      alert('Complaint Successfully Send');
    }
  }, [
    overlayopen,
    subjecttext,
    complaintmessage,
    complaintType,
    complaintTypeOther,
    others,
    dispatch,
    users_reducers?.user_pk,
    singleFile,
  ]);
  const handleCancelButton = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleRemoveItem = useCallback((e, i) => {
    setcomplaintResource(
      complaintResource.filter((item, index) => index !== i),
    );
  });
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      for (const res of results) {
        setSingleFile(prev => [...prev, res]);
        setcomplaintResource(prev => [...prev, {uri: res.uri}]);
      }
      // Setting the state to show single file attributes
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const handleComplaintType = (val,index)=> {
    if(index === 6){
      setOther(true);
    }else{
      setOther(false);
    }
    setComplaintType(val)
  }
  const handleComplaintTypeOther =(val)=> {
    setComplaintTypeOther(val)
  }
  const [gestureName, setgestureName] = useState('');

  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setIsVisible(false);

        break;
      case SWIPE_LEFT:
        setIsVisible(false);
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        setIsVisible(false);
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80,
  };

  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{marginBottom: 50}}
        data={complaintslist}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
        }}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotocomplaints(item)}
            underlayColor="white">
            <Card radius={15}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 20,
                    padding: 5,
                  }}>
                  <Text numberOfLines={1} style={styles.Titletext}>
                    Subject: {item?.title}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 60,
                    padding: 5,
                  }}>
                  <Text numberOfLines={1} style={styles.text}>
                    Body: {item?.body}
                  </Text>
                  <Text numberOfLines={1} style={styles.reportedAt}>
                    {item?.reported_at}
                  </Text>
                </View>
              </View>

              {/* <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <View
                  style={{
                    width: 150,
                    height: 100,
                  }}>
                  <Text style={styles.text}>
                    {item?.SUBJECT} {item?.body}{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: 200,
                    height: 100,
                  }}>
                  <Text numberOfLines={1} style={styles.text}></Text>
                </View>
              </View> */}
            </Card>
          </TouchableHighlight>
        )}
      />
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}
        style={{
          flex: 1,
        }}>
        <Modal
          visible={isVisible}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 50,
              }}>
              <View
                style={{
                  width: '20%',
                  height: 50,
                }}>
                <Icon
                  raised
                  name="times"
                  type="font-awesome"
                  color="#f50"
                  onPress={() => handleCancelButton()}
                />
              </View>
              <View
                style={{
                  width: '20%',
                  height: 50,
                }}>
                <Icon
                  raised
                  name="paper-plane"
                  type="font-awesome"
                  color="#00aced"
                  onPress={() => handleSendButton()}
                />
              </View>

              <Divider style={{marginTop: 20, backgroundColor: 'grey'}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <Input
                  placeholder="Subject"
                  onChangeText={value => handleSubject(value)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    backgroundColor: 'white)',
                  }}>
                  <Input
                    placeholder="Message"
                    multiline
                    numberOfLines={5}
                    onChangeText={value => handleComplaintmessage(value)}
                  />
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    backgroundColor: 'white)',
                  }}>
                 <Picker
                      selectedValue={complaintType}
                      // value={Occationofthehouse}
                      style={styles.PickerContainer}
                      onValueChange={(itemValue, itemIndex) =>
                        handleComplaintType(itemValue,itemIndex)
                      }>
                      <Picker.Item key={0} label="Noise Complaint" value="Noise Complaint" />
                      <Picker.Item key={1} label="Harassment" value="Harassment" />
                      <Picker.Item key={2} label="litter" value="litter" />
                      <Picker.Item key={3} label="Unsafe streets" value="Unsafe streets" />
                      <Picker.Item
                        key={4}
                        label="Domestic violence"
                        value="Domestic violence"
                      />
                      <Picker.Item
                        key={5}
                        label="Child abuse"
                        value="Child abuse"
                      />
                        <Picker.Item
                        key={6}
                        label="Others"
                        value="Others"
                      />
                    </Picker>
                </View>
              </View>
              {others?(    
                <View
                style={{
                  width: '100%',
                  paddingBottom:10
                }}>
                <View
                  style={{
                    backgroundColor: 'white)',
                  }}>
                  <Input
                    placeholder="Type of Complaint"
                    onChangeText={value => handleComplaintTypeOther(value)}
                  />
                </View>
              </View>
            ):null}
          
              <View style={{width: '30%', height: 100, padding: 5}}>
                <Button
                  style={{color: 'black'}}
                  icon={<Icons name="file-image-o" size={15} color="green" />}
                  iconLeft
                  type="outline"
                  title=" Photo"
                  onPress={selectFile}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 450,
                  maxHeight: 10000,
                }}>
                <View
                  style={{
                    backgroundColor: 'white)',
                  }}>
                  <Text style={{textAlign: 'center', padding: 10}}>
                    Attached Image
                  </Text>
                </View>
                <ScrollView>
                  <CustomFlexBox label="flexDirection" selectedValue={'column'}>
                    {complaintResource.map((item, index) => (
                      <View style={{width: 100 + '%'}} key={index}>
                        <TouchableNativeFeedback
                          onLongPress={() => handleRemoveItem(item, index)}
                          underlayColor="white">
                          <Card
                            style={styles.avatar}
                            radius={1}
                            backgroundColor={'#ffffff'}>
                            <View
                              style={{
                                flexDirection: 'row',
                                height: 500,
                                maxHeight: 2000,
                                alignItems: 'center',
                              }}>
                              <ImageBackground
                                source={{
                                  uri: item.uri,
                                }}
                                style={styles.avatar}></ImageBackground>
                            </View>
                          </Card>
                        </TouchableNativeFeedback>
                      </View>
                    ))}
                  </CustomFlexBox>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => handleFloatingIcon()}
      />
    </SafeAreaView>

    // </ImageBackground>
  );
};

export default Complaints;
