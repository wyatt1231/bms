import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  ImageBackground,
  Image,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Button, Badge, ButtonGroup, Card} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
//import Card from 'react-native-rn-Card';
//import {Actions} from 'react-native-router-flux';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../../Plugins/waitinterval';
import CustomBottomSheet from '../../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import {
  action_get_posts_info,
  action_get_posts_comments,
  action_set_posts_reactions,
  action_posts_add_comment,
} from '../../../Services/Actions/PostsActions';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import settings from '../../../settings.json';
const PostsInfo = () => {
  const posts_info = useSelector(state => state.PostsReducers.posts_info);

  const posts_reaction = useSelector(
    state => state.PostsReducers.posts_reaction,
  );
  const posts_comments = useSelector(
    state => state.PostsReducers.posts_comments,
  );
  const onChangeText = useCallback(text => {
    setcomment(text);
  });
  const base_url = useSelector(state => state.PostsReducers.base_url);
  const dispatch = useDispatch();
  const [posts_pk, setposts_pk] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [comment, setcomment] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [visible, setvisible] = useState(false);
  const [imgpath, setimgpath] = useState('');
  const navigation = useNavigation();
  // AsyncStorage.getItem('posts_id').then(item => {
  //   console.log(item);
  //   if (item == null) {
  //     navigation.navigate('Dashboard');
  //     //Actions.home();
  //   } else {
  //     setposts_pk(item);
  //   }
  // });
  useEffect(() => {
    const initializePosts = () => {
      setposts_pk(posts_info[0]?.posts_pk);
    };
    initializePosts();
  }, [posts_info]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(action_get_posts_info(posts_pk)).then(() => {
      setRefreshing(false);
    });
  }, [dispatch, posts_pk]);

  const updateIndex = useCallback(
    async index => {
      await dispatch(action_get_posts_comments(posts_pk));
      if (index !== 0) {
        setisVisible(true);
      } else {
        await dispatch(action_set_posts_reactions(posts_pk, 'Like'));
        await dispatch(action_get_posts_info(posts_pk));
      }
    },
    [dispatch, posts_pk],
  );
  const handleCommentSend = useCallback(async () => {
    if (comment.length > 0) {
      await dispatch(action_posts_add_comment(posts_pk, comment));

      await dispatch(action_get_posts_comments(posts_pk));
      await setcomment('');
    }
  }, [dispatch, comment, posts_pk]);
  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="thumbs-up" size={15} color="grey" /> Like
        </Text>
      </>
    );
  };
  const hadnleClickPhoto = img => {
    setvisible(true);
    setimgpath(`${settings.BASE_URL}/${img?.file_path}`);
  };
  const images = [
    {
      uri: imgpath,
    },
  ];
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
        <Icons name="comment" size={15} color="grey" /> Comment
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];
  const buttonliked = [{element: liked}, {element: component2}];
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
    directionalOffsetThreshold: 1000,
  };
  return (
    // <ImageBackground
    // style={{flex: 1}}
    // source={require('../../assets/background/bgImage.jpg')}
    // resizeMode="cover"
    // blurRadius={20}>

    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Card radius={1}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            padding: 10,
            marginTop: 10,
            alignItems: 'center',
            maxHeight: 1000,
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
                    uri: `${settings.BASE_URL}/${posts_info[0]?.user_pic}`,
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
                  {posts_info[0]?.user_full_name}
                  {'\n'}
                  {posts_info[0]?.TIMESTAMP}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            width: '100%',
            height: screenHeight - 1000,
          }}>
          <ScrollView>
            <Text style={{flex: 1, flexWrap: 'wrap'}}>
              {posts_info[0]?.title}
            </Text>
          </ScrollView>
        </View>
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
              {posts_info[0]?.reactions?.map((likes, index) => {
                return (
                  <Badge status="primary" key={index} value={likes?.likes} />
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
              {posts_info[0]?.totalcomments.map((comments, index) => {
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
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setvisible(false)}
        />
        {posts_info[0]?.liked[0]?.reaction ? (
          <ButtonGroup
            onPress={index => updateIndex(index)}
            buttons={buttonliked}
            containerStyle={{height: 35, marginBottom: 15}}
          />
        ) : (
          <ButtonGroup
            onPress={index => updateIndex(index)}
            buttons={buttons}
            containerStyle={{height: 35, marginBottom: 15}}
          />
        )}
      </Card>

      {posts_info[0]?.upload_files.map((img, index) => {
        return (
          <View style={{width: '100%', height: screenHeight}} key={index}>
            <TouchableNativeFeedback
              key={index}
              underlayColor="white"
              onPress={() => hadnleClickPhoto(img)}>
              <Card
                radius={1}
                containerStyle={{backgroundColor: 'rgba(255,255,355,0.5)'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: screenHeight - 1000,
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    source={{
                      uri: `${settings.BASE_URL}/${img?.file_path}`,
                    }}
                    style={styles.avatar}
                  />
                </View>
              </Card>
            </TouchableNativeFeedback>
          </View>
        );
      })}
      <ScrollView>
        <View>
          <View style={styles.containerNOTIFICATION}>
            <Text>Comments</Text>
          </View>
        </View>
        {posts_comments.map(Notification => {
          return (
            <Card
              key={Notification.posts_comment_pk}
              containerStyle={{borderRadius: 14}}>
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
                          uri: `${settings.BASE_URL}/${Notification?.pic}`,
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
                    <View style={{width: '95%', height: 100}}>
                      <Text style={styles.containerNOTIFICATION}>
                        {Notification?.fullname}
                        {'\n'}
                        {Notification?.body}
                      </Text>
                      <Text style={styles.timestamp}>
                        {Notification?.TIMESTAMP}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
      {/* // ) : (
        //   <>
        //     <Text numberOfLines={6} style={styles.noimagetext}>
        //       {item.body}
        //     </Text>
        //   </>
        // );
        // } */}
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}>
        <CustomBottomSheet
          isVisible={isVisible}
          color="white"
          UI={
            <SafeAreaView>
              <ScrollView>
                <View>
                  <View style={styles.containerNOTIFICATION}>
                    <Text>Comments</Text>
                  </View>
                </View>
                {posts_comments.map(Notification => {
                  return (
                    <Card
                      key={Notification.posts_comment_pk}
                      containerStyle={{borderRadius: 14}}>
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
                                  uri: `${settings.BASE_URL}/${Notification?.pic}`,
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
                            <View style={{width: '95%', height: 100}}>
                              <Text style={styles.containerNOTIFICATION}>
                                {Notification?.fullname}
                                {'\n'}
                                {Notification?.body}
                              </Text>
                              <Text style={styles.timestamp}>
                                {Notification?.TIMESTAMP}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Card>
                  );
                })}
              </ScrollView>
              <View>
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
                          onChangeText={text => onChangeText(text)}
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
              </View>
            </SafeAreaView>
          }
        />
      </GestureRecognizer>
    </ScrollView>
    // </ImageBackground>
  );
};

export default PostsInfo;
