import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import {Badge, Button, Card, withBadge} from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
//import Card from 'react-native-rn-Card';
//import {Actions} from 'react-native-router-flux';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {HelperText} from 'react-native-paper';
import {swipeDirections} from 'react-native-swipe-gestures';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_get_posts,
  action_get_posts_comments,
  action_posts_add_comment,
  action_set_posts,
  action_set_posts_pk,
} from '../../../Services/Actions/PostsActions';
import settings from '../../../settings.json';
import UILiked from '../Liked';
const Posts = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  var IMAGES_PER_ROW = 3;

  const calculatedSize = () => {
    var size = windowWidth / IMAGES_PER_ROW;
    return {width: size, height: size};
  };
  const posts_reducers = useSelector(state => state.PostsReducers.posts_data);
  const posts_reaction = useSelector(
    state => state.PostsReducers.posts_reaction,
  );
  const posts_comments = useSelector(
    state => state.PostsReducers.posts_comments,
  );
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const base_url = useSelector(state => state.PostsReducers.base_url);
  const [offset, setoffset] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIndex, setseletedIndex] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  const [addpostVisible, setaddpostVisible] = useState(false);
  const [comment, setcomment] = useState('');
  const [posts_id, setposts_id] = useState('');
  const [post, setpost] = useState('');
  const [postResource, setpostResource] = useState([]);
  const [multipleFile, setmultipleFile] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onChangeText = useCallback(text => {
    setcomment(text);
  });
  // const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setoffset(prev => prev + 2);

    dispatch(action_get_posts(offset)).then(() => {
      setRefreshing(false);
    });
  }, [dispatch]);
  const gotopostsinfo = useCallback(
    async item => {
      dispatch(action_set_posts_pk(item.posts_pk.toString()));
      navigation.navigate('Post Info');
      //Actions.postsinfo();
    },
    [dispatch],
  );

  const handleAddPostPress = useCallback(() => {
    setaddpostVisible(true);
  }, []);
  const handleRemoveItem = useCallback((e, i) => {
    setpostResource(postResource.filter((item, index) => index !== i));
    setmultipleFile(multipleFile.filter((item, index) => index !== i));
  });
  const handleSubmitPostPress = useCallback(async () => {
    if (post.length > 0) {
      dispatch(action_set_posts(post, post, multipleFile));

      setaddpostVisible(false);
      dispatch(action_get_posts(offset));
      setpost('');
      setmultipleFile([]);
      setpostResource([]);
    }
  }, [dispatch, post, multipleFile, offset]);
  const handleCommentSend = useCallback(async () => {
    if (comment.length > 0) {
      await dispatch(action_posts_add_comment(posts_id, comment));

      await dispatch(action_get_posts_comments(posts_id));
      await setcomment('');
    }
  }, [dispatch, comment, posts_id]);
  const handleChangeTextPost = useCallback(
    async text => {
      setpost(text);
    },
    [dispatch, post],
  );

  const backAction = () => {
    setisVisible(false);
    setaddpostVisible(false);
    return true;
  };
  const loadmore = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      setoffset(prev => prev + 5);
    }
    return () => {
      mounted = false;
    };
  }, [offset]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  // const buttons = [{element: component1}, {element: component2}];
  // const buttonliked = [{element: liked}, {element: component2}];
  const [gestureName, setgestureName] = useState('');
  const onSwipePostComment = useCallback((gestureName, gestureState) => {
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
  const onSwipeAddPost = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setaddpostVisible(false);

        break;
      case SWIPE_LEFT:
        setaddpostVisible(false);
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
  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });

      const newFiles = results.map(res => ({uri: res.uri}));
      setpostResource(prev => [...prev, ...newFiles]);
      setmultipleFile(prev => [...prev, ...results]);
    } catch (err) {
      setmultipleFile(null);

      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const BadgedIcon = withBadge(1)(Icons);
  let imageUri = 'data:image/png;base64,' + users_reducers?.pic;
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <View style={{marginTop: -5, marginBottom: 30, height: 80}} radius={1}>
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
              <View style={{width: 95 + '%', height: 50, padding: 5}}>
                {/* <TextInput
                  style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                  multiline
                  placeholder="What's on you mind"
                  numberOfLines={4}
                  onPress={() => ()}
                  onChangeText={(text) => handleChangeTextPost(text)}
                  value={post}
                /> */}
                <Button
                  title="What's on your mind?"
                  type="clear"
                  onPress={() => handleAddPostPress()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <Modal avoidKeyboard visible={addpostVisible}>
        {/* <GestureRecognizer
          onSwipe={(direction, state) => onSwipeAddPost(direction, state)}
          config={config}> */}
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <View style={styles.containerclose}>
            <TouchableHighlight
              onPress={() => setaddpostVisible(false)}
              underlayColor={'white'}>
              <Icons size={25} name={'close'} />
            </TouchableHighlight>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{width: '50%', height: '100%'}}>
              <Text style={styles.createPost}>Create Post</Text>
            </View>
            <View style={{width: '30%', height: '100%'}}>
              <Button
                title="Post"
                type="outline"
                onPress={() => handleSubmitPostPress()}
              />
            </View>
          </View>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              marginBottom: 50,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100} // Adjust the offset as needed
          >
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 50,
                marginStart: 25,
                marginBottom: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                }}>
                <View style={{width: 20 + '%', height: 30}}>
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
                <View style={{width: screenWidth - 50, height: screenHeight}}>
                  <Text style={styles.fullnametext}>
                    {users_reducers.full_name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{width: '100%', height: 620, maxHeight: 5000}}>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: '#cdced1',
                  padding: 20,
                  fontSize: 16,
                  color: '#464746',
                }}
                multiline
                placeholder="What's on your mind"
                numberOfLines={4}
                onChangeText={text => handleChangeTextPost(text)}
                value={post}
              />
              <View style={{width: '50%', height: 50, padding: 5}}>
                <Button
                  style={{color: 'black'}}
                  icon={<Icons name="image-album" size={15} color="green" />}
                  iconLeft
                  type="outline"
                  title=" Photo"
                  onPress={selectFile}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',

                  width: screenWidth,
                  height: screenHeight,
                }}>
                <HelperText
                  type="info"
                  visible={true}
                  padding="none"
                  style={{overflow: 'visible'}}>
                  Long press image to remove & swipe left right to show other
                  image
                </HelperText>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <FlatList
                    data={postResource}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadmore}
                    onEndReachedThreshold={0.1}
                    contentContainerStyle={{paddingBottom: 400}}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignSelf: 'center',
                          marginBottom: screenHeight - 800,
                        }}
                        key={index}>
                        <TouchableNativeFeedback
                          onLongPress={() => handleRemoveItem(item, index)}
                          underlayColor="white">
                          <View
                            style={styles.avatar}
                            radius={1}
                            backgroundColor={'#ffffff'}>
                            <ImageBackground
                              source={{
                                uri: item.uri,
                              }}
                              style={styles.avatar}></ImageBackground>
                          </View>
                        </TouchableNativeFeedback>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        {/* </GestureRecognizer> */}
      </Modal>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={posts_reducers.data}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotopostsinfo(item)}
            underlayColor="white">
            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
                padding: 20,
                backgroundColor: 'white',
              }}
              radius={1}>
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
                      source={item.upload_files.map(item => {
                        return {
                          uri: `${settings.BASE_URL}/${item.file_path}`,
                          width: 400,
                          height: 100,
                        };
                      })}
                      style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
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
              <View>
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
                      <Icons name="thumb-up" size={15} color="grey" />
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
                      width: screenWidth - 1000,
                    }}>
                    <View style={{width: '100%'}}>
                      {item?.totalcomments.map((comments, index) => {
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
                <UILiked item={item} />
                {/* {item?.liked[0]?.reaction ? (
                  <ButtonGroup
                    onPress={(index) => updateIndex(item, index)}
                    buttons={buttonliked}
                    containerStyle={{height: 35, marginBottom: 15}}
                  />
                ) : (
                  <ButtonGroup
                    onPress={(index) => updateIndex(item, index)}
                    buttons={buttons}
                    containerStyle={{height: 35, marginBottom: 15}}
                  />
                )} */}
                <ScrollView>
                  {item.comments.map(comments => {
                    return (
                      <Card key={comments.posts_comment_pk}>
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
                                    uri: `${settings.BASE_URL}/${comments?.pic}`,
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
                              <View style={{width: 100 + '%', height: 100}}>
                                <Text style={styles.containerNOTIFICATION}>
                                  {comments?.fullname}
                                  {'\n'}
                                  {comments?.body}
                                </Text>
                                <Text style={styles.timestamp}>
                                  {comments?.TIMESTAMP}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </Card>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
};

export default Posts;
