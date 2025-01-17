import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
//import Card from 'react-native-rn-Card';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ImageBackground,
  FlatList,
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import {Actions} from 'react-native-router-flux';
import DocumentPicker from 'react-native-document-picker';
import {action_get_userinfo} from '../../Services/Actions/UserInfoActions';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  ButtonGroup,
  Badge,
  Icon,
  withBadge,
  Card,
} from 'react-native-elements';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import wait from '../../Plugins/waitinterval';
import {
  action_get_user_posts,
  action_get_posts_comments,
  action_set_posts_reactions,
  action_posts_add_comment,
  action_set_posts,
} from '../../Services/Actions/PostsActions';
import Dateconverter from '../../Plugins/Dateconverter';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import CustomFlexBox from '../../Plugins/CustomFlexBox';
import {HelperText} from 'react-native-paper';
import settings from '../../settings.json';
const MeInfo = () => {
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const user_posts = useSelector(state => state.PostsReducers.posts_user_data);
  const posts_reducers = useSelector(state => state.PostsReducers.posts_data);
  const base_url = useSelector(state => state.PostsReducers.base_url);

  const posts_comments = useSelector(
    state => state.PostsReducers.posts_comments,
  );
  const [postResource, setpostResource] = useState([]);
  const [multipleFile, setmultipleFile] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [PostIsVisible, setPostIsVisible] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [comment, setcomment] = useState('');
  const [posts_id, setposts_id] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [post, setpost] = useState('');
  const [age, setage] = useState('');
  const defaultImages = {
    m: require('../../assets/default/male-profile.png'),
    f: require('../../assets/default/female-profile.png'),
  };
  useEffect(() => {
    let mounted = true;

    const userinfoanduserposts = () => {
      dispatch(action_get_userinfo());
      dispatch(action_get_user_posts());
    };

    mounted && userinfoanduserposts();
    return () => (mounted = false);
  }, [dispatch]);
  const calculate_age = dob1 => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    setage(age_now);
    return age_now;
  };
  useEffect(() => {
    let mounted = true;

    const userinfoanduserposts = () => {
      calculate_age(users_reducers?.birth_date);
    };

    mounted && userinfoanduserposts();
    return () => (mounted = false);
  }, []);
  let imageUri = 'data:image/png;base64,' + users_reducers?.pic;

  const handleAddPostPress = useCallback(() => {
    navigation.navigate('My Family Members');
    //Actions.family_member();
  }, []);
  const handleChangeTextPost = useCallback(text => {
    setpost(text);
  }, []);
  const onCommentChangeText = useCallback(
    text => {
      setcomment(text);
    },
    [comment],
  );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_userinfo());
      dispatch(action_get_user_posts());
    });
  }, [dispatch]);
  const handleCommentSend = useCallback(async () => {
    await dispatch(action_get_posts_comments(posts_id));
    if (comment !== '') {
      await dispatch(action_posts_add_comment(posts_id, comment));
      await setcomment('');
    }
  }, [dispatch, comment, posts_id]);
  const handleSubmitPostPress = useCallback(async () => {
    if (post.length > 0) {
      await dispatch(action_set_posts(post, post, multipleFile));

      await setPostIsVisible(false);
      await dispatch(action_get_posts());
      await setpost('');
      await setmultipleFile([]);
      await setpostResource([]);
    }
  }, [dispatch, post, multipleFile]);
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        setpostResource(prev => [...prev, {uri: res.uri}]);
        setmultipleFile(prev => [...prev, res]);
      }

      // Setting the state to show single file attributes
    } catch (err) {
      setmultipleFile(null);
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
  const updateIndex = useCallback(
    (item, index) => {
      setposts_id(item?.posts_pk);
      dispatch(action_get_posts_comments(item?.posts_pk));
      if (index !== 0) {
        setisVisible(true);
      } else {
        dispatch(action_set_posts_reactions(item?.posts_pk, 'Like'));
        dispatch(action_get_user_posts());
      }
    },
    [dispatch],
  );
  const [gestureName, setgestureName] = useState('');
  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setPostIsVisible(false);

        break;
      case SWIPE_LEFT:
        setPostIsVisible(false);
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const gotopostsinfo = useCallback(async item => {
    await AsyncStorage.setItem('posts_id', item?.posts_pk.toString());
    navigation.navigate('Post Info');
    //Actions.postsinfo();
  }, []);
  const onSwipeComments = useCallback((gestureName, gestureState) => {
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
    directionalOffsetThreshold: 1000,
  };

  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="thumbs-up" size={15} color="grey" /> Like
        </Text>
      </>
    );
  };
  const liked = () => {
    return (
      <View
        style={{
          backgroundColor: '#0099ff',

          width: '100%',
          overflow: 'hidden',
          height: '100%',
          borderColor: '',
        }}>
        <Text style={{textAlign: 'center', color: 'white', marginTop: 5}}>
          <Icons name="thumbs-up" size={15} color="white" /> Like
        </Text>
      </View>
    );
  };
  const component2 = () => {
    return (
      <Text>
        <Icon name="comment" size={15} color="grey" /> Comment
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];
  const buttonliked = [{element: liked}, {element: component2}];
  const FlatListHeader = () => (
    <View containerStyle={styles.plate}>
      <View
        radius={1}
        backgroundColor={'#ffffff'}
        style={{margin:15,padding:10,height: screenHeight - 550, marginBottom: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              width: '100%',
              height: screenHeight - 450,
              textAlign: 'center',
            }}>
              <Image
                  style={{
                    marginTop: 10,
                    marginStart: 10,
                    alignSelf: 'center',
                    width: 100,
                    height: 100,
                    borderRadius: 180 / 2,
                    overflow: 'hidden',
                    borderWidth: 3,
                  }}
                  source={
                    users_reducers?.pic?.length > 0 || users_reducers?.pic !== null
                      ? { uri: imageUri, scale: 1 }
                      : defaultImages[users_reducers.gender] || defaultImages.f}
                />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {users_reducers?.full_name}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 12}}>Age :{age}</Text>
            <Text style={{textAlign: 'center', fontSize: 12}}>
              Birthday : {Dateconverter(users_reducers?.birth_date)}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                textTransform: 'capitalize',
              }}>
              Civil Status : {users_reducers?.civil_status}
            </Text>
          </View>
        </View>
      </View>
      <Button
        title="Show family members"
        type="clear"
        onPress={() => handleAddPostPress()}
      />
    </View>
  );
  return (
    // <ImageBackground
    // style={{flex: 1}}
    // source={require('../../assets/background/bgImage.jpg')}
    // resizeMode="cover"
    // blurRadius={20}>
    <SafeAreaView style={styles.flatlistcontainer}>
      {/* <ScrollView>
       
      </ScrollView> */}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={user_posts}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <View containerStyle={styles.plate}>
            <TouchableHighlight
              onPress={() => gotopostsinfo(item)}
              underlayColor="white">
              <Card style={{marginTop: 10, marginBottom: 20}} radius={1}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 50,
                    padding: 10,
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <View style={styles.contentNOTIFICATION}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 50,
                      }}>
                      <View style={{width: 20 + '%', height: 20}}>
                        <Image
                          source={{
                            uri: `data:image/png;base64,${item?.user_pic}`,
                          }}
                          style={{
                            marginTop: 10,
                            marginStart: 10,
                            width: 40,
                            height: 40,
                            borderRadius: 120 / 2,
                            overflow: 'hidden',
                            borderWidth: 3,
                          }}
                        />
                      </View>
                      <View style={{width: 95 + '%', height: 70}}>
                        <Text style={styles.containerNOTIFICATION}>
                          {item?.user_full_name}
                          {'\n'}
                          {item?.TIMESTAMP}
                        </Text>
                      </View>
                    </View>

                    <Text rkType="primary3 mediumLine"></Text>
                  </View>
                </View>
                {item?.upload_files[0]?.file_path ? (
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 300,
                      alignItems: 'center',
                    }}>
                    <View style={{width: '100%', height: screenHeight - 1000}}>
                      <Text numberOfLines={6} style={styles.text}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={{width: '100%', height: screenHeight - 600}}>
                      <ImageBackground
                        source={item.upload_files?.map(item => {
                          return {
                            uri: `${settings.BASE_URL}/${item.file_path}`,
                            width: 100,
                            height: 100,
                          };
                        })}
                        style={{
                          display:"flex",
                          width: '100%',
                          height: '100%',
                          flex:1,
                          resizeMode: 'cover',
                          justifyContent: 'center',
                        }}></ImageBackground>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text numberOfLines={6} style={styles.noimagetext}>
                      {item.body}
                    </Text>
                  </>
                )}
                <View style={{marginStart: -10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 30,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                      }}>
                      <View
                        style={{
                          width: 30,
                          marginBottom: -20,
                          marginStart: 20,
                        }}>
                        <Icons name="thumbs-up" size={15} color="grey" />
                      </View>
                      <View style={{width: 80}}>
                        {item?.reactions?.map((likes, index) => {
                          return (
                            <Badge
                              status="primary"
                              key={index}
                              value={likes?.likes}
                            />
                          );
                        })}
                      </View>
                    </View>
                    <View
                      style={{
                        alignItems: 'stretch',
                        width: screenWidth - 270,
                      }}>
                      <View style={{width: '100%'}}>
                        {item?.totalcomments?.map((comments, index) => {
                          return (
                            <Text key={index}>
                              <Text> {comments.comments} </Text>
                              Comments
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                  {item?.liked[0]?.reaction ? (
                    <ButtonGroup
                      onPress={index => updateIndex(item, index)}
                      buttons={buttonliked}
                      containerStyle={{height: 35, marginBottom: 15}}
                    />
                  ) : (
                    <ButtonGroup
                      onPress={index => updateIndex(item, index)}
                      buttons={buttons}
                      containerStyle={{height: 35, marginBottom: 15}}
                    />
                  )}
                </View>
              </Card>
            </TouchableHighlight>
          </View>
        )}
        ListHeaderComponent={<FlatListHeader />}
      />
      {/* <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={user_posts}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <Card style={{marginTop: -5, marginBottom: 20}} radius={1}>
            <View
              style={{
                flexDirection: 'row',
                height: 50,
                padding: 10,

                flex: 1,
                alignItems: 'center',
              }}>
              <View style={styles.contentNOTIFICATION}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 50,
                  }}>
                  <View style={{width: 20 + '%', height: 20}}>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${item?.user_pic}`,
                      }}
                      style={{
                        marginTop: 10,
                        marginStart: 10,
                        width: 40,
                        height: 40,
                        borderRadius: 120 / 2,
                        overflow: 'hidden',
                        borderWidth: 3,
                      }}
                    />
                  </View>
                  <View style={{width: 95 + '%', height: 50}}>
                    <Text style={styles.containerNOTIFICATION}>
                      {item?.user_full_name}
                      {'\n'}
                      {item?.TIMESTAMP}
                    </Text>
                  </View>
                </View>

                <Text rkType="primary3 mediumLine"></Text>
              </View>
            </View>
            {item.upload_files[0]?.file_path ? (
              <View
                style={{
                  flexDirection: 'row',
                  height: 300,
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={item.upload_files.map((item) => {
                    return {
                      uri: `${settings.BASE_URL}/${item.file_path}`,
                      width: 400,
                      height: 100,
                    };
                  })}
                  // source={{
                  //   uri:
                  //     'http://192.168.1.4:4050/src/Storage/Files/News/1613828094461images%20(2).jfif',
                  // }}
                  style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <Text numberOfLines={6} style={styles.text}>
                      {item.title}
                      {'\n'}
                      {'\n'}
                      {item.body}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            ) : (
              <>
                <Text numberOfLines={6} style={styles.noimagetext}>
                  {item.body}
                </Text>
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <View style={{width: 30, marginBottom: -20, marginStart: 20}}>
                  <Icons name="thumbs-up" size={15} color="grey" />
                </View>
                <View style={{width: 80}}>
                  <Badge status="primary" value={item?.likes} />
                </View>
              </View>
            </View>
            <ButtonGroup
              onPress={(index) => updateIndex(item, index)}
              buttons={buttons}
              containerStyle={{height: 35, marginBottom: 15}}
            />
          </Card>
        )}
      /> */}

      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}>
        <CustomBottomSheet
          isVisible={PostIsVisible}
          color="white"
          UI={
            <SafeAreaView>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                }}>
                <View style={{width: 300, height: 30}}>
                  <Text style={styles.fullnametext}>Create Post</Text>
                </View>
                <View style={{width: 100, height: 30}}>
                  <Button
                    title="Post"
                    type="outline"
                    onPress={() => handleSubmitPostPress()}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    marginTop: 10,
                    marginStart: 5,
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 50,
                    }}>
                    <View style={{width: 50, height: 30}}>
                      <Image
                        source={{
                          uri: imageUri,
                        }}
                        style={{
                          marginTop: 10,
                          marginStart: 10,
                          width: 40,
                          height: 40,
                          borderRadius: 120 / 2,
                          overflow: 'hidden',
                          borderWidth: 3,
                        }}
                      />
                    </View>
                    <View style={{width: 350, height: 30}}>
                      <Text style={styles.fullnametext}>
                        {users_reducers.full_name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: screenHeight - 300}}>
                  <TextInput
                    style={{
                      borderWidth: 2,
                      borderColor: '#f7f5f5',
                      padding: 20,
                      fontSize: 32,
                    }}
                    multiline
                    placeholder="What's on you mind"
                    numberOfLines={4}
                    onChangeText={text => handleChangeTextPost(text)}
                    value={post}
                  />
                </View>
                <View style={{width: 30 + '%', height: 50, padding: 5}}>
                  <Button
                    style={{color: 'black'}}
                    icon={<Icons name="file-image-o" size={15} color="green" />}
                    iconLeft
                    type="outline"
                    title=" Photo"
                    onPress={selectFile}
                  />
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
                      height: screenHeight - 1000,
                    }}>
                    <ScrollView horizontal={true}>
                      {postResource?.map((item, index) => (
                        <View style={{width: '100%'}} key={index}>
                          <TouchableNativeFeedback
                            onLongPress={() => handleRemoveItem(item, index)}
                            underlayColor="white">
                            <View
                              style={styles.avatar}
                              radius={1}
                              backgroundColor={'#ffffff'}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  height: screenHeight - 500,
                                  alignItems: 'center',
                                }}>
                                <ImageBackground
                                  source={{
                                    uri: item.uri,
                                  }}
                                  style={styles.avatar}></ImageBackground>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          }
        />
      </GestureRecognizer>
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipeComments(direction, state)}
        config={config}>
        <CustomBottomSheet
          isVisible={isVisible}
          color="white"
          UI={
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 50,
                  height: 10,
                }}>
                <View style={styles.containerNOTIFICATION}>
                  <Text>Comments</Text>
                </View>
                <View style={styles.containerclose}>
                  <TouchableHighlight
                    onPress={() => setisVisible(false)}
                    underlayColor={'white'}>
                    <Icons size={20} name={'close'} />
                  </TouchableHighlight>
                </View>
              </View>
              <ScrollView>
                {posts_comments.map(Notification => {
                  return (
                    <Card key={Notification.posts_comment_pk}>
                      <View style={styles.containercomment}>
                        <View style={styles.contentNOTIFICATION}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              marginBottom: 50,
                              height: 100,
                            }}>
                            <View style={{width: 30 + '%', height: 100}}>
                              <Image
                                source={{
                                  uri: `data:image/png;base64,${Notification?.user_pic}`,
                                }}
                                style={{
                                  marginTop: 10,
                                  marginStart: 10,
                                  width: 40,
                                  height: 40,
                                  borderRadius: 120 / 2,
                                  overflow: 'hidden',
                                  borderWidth: 3,
                                }}
                              />
                            </View>
                            <View style={{width: 95 + '%', height: 100}}>
                              <Card key={Notification.posts_comment_pk}>
                                <Text style={styles.containerNOTIFICATION}>
                                  {Notification?.fullname}
                                  {'\n'}
                                  {Notification?.body}
                                </Text>
                              </Card>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Card>
                  );
                })}
              </ScrollView>
              <Card>
                <View style={styles.containerNOTIFICATION}>
                  <View style={styles.contentNOTIFICATION}>
                    <Text style={styles.nameNOTIFICATION}>Comment</Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 50,
                      }}>
                      <View style={{width: 320, height: 40}}>
                        <TextInput
                          style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                          multiline
                          numberOfLines={4}
                          onChangeText={text => onCommentChangeText(text)}
                          value={comment}
                        />
                      </View>
                      <View style={{width: 50, height: 50}}>
                        <Button
                          icon={
                            <Icons name="arrow-right" size={20} color="white" />
                          }
                          onPress={() => handleCommentSend()}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          }
        />
      </GestureRecognizer>
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
    padding:15,
  },
  containerclose: {
    paddingRight: 16,
    marginBottom: 10,
    maxHeight: 1000,
    alignItems: 'flex-end',
  },
  avatar: {
    width: '100%',
    height: 500,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
  },
  containerNOTIFICATION: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
  containercomment: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    maxHeight: 300,
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    color: 'black',
  },
  noimagetext: {
    color: 'black',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
  },
  fullnametext: {
    color: 'black',
    fontSize: 23,
    padding: 10,
    textAlign: 'justify',
  },
  flatlistcontainer: {
    flex: 1,
    height: '100%',
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
});

export default MeInfo;
