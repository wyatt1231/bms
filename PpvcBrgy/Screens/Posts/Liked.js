import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {Button, ButtonGroup, Card} from 'react-native-elements';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Icons from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import {
  action_get_posts_comments,
  action_get_posts_reactions,
  action_set_posts_pk,
  action_get_posts,
  action_set_posts_reactions,
  action_posts_add_comment,
} from '../../Services/Actions/PostsActions';
import styles from './styles';
import settings from '../../settings.json';
const UILiked = ({item}) => {
  const posts_comments = useSelector(
    state => state.PostsReducers.posts_comments,
  );
  const base_url = useSelector(state => state.PostsReducers.base_url);
  const posts_reactions = useSelector(
    state => state.PostsReducers.posts_reactions,
  );
  const [comment, setcomment] = useState('');
  const [posts_id, setposts_id] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const reactions = () => {
      setposts_id(item?.posts_pk);
      dispatch(action_get_posts_reactions(item.posts_pk));
    };
    mounted && reactions();
    return () => (mounted = false);
  }, [dispatch]);
  const onChangeText = useCallback(text => {
    setcomment(text);
  });
  const handleCommentSend = useCallback(async () => {
    if (comment.length > 0) {
      await dispatch(action_posts_add_comment(posts_id, comment));

      await dispatch(action_get_posts_comments(posts_id));
      await setcomment('');
    }
  }, [dispatch, comment, posts_id]);
  const updateIndex = useCallback(
    async (item, index) => {
      if (index !== 0) {
        // await setposts_id(item?.posts_pk);
        await dispatch(action_get_posts_comments(item.posts_pk));

        await setisVisible(true);
      } else {
        await dispatch(action_set_posts_reactions(item.posts_pk, 'Like'));
        await dispatch(action_set_posts_pk(item.posts_pk));
        await dispatch(action_get_posts_reactions(item.posts_pk));
        await dispatch(action_get_posts());
        console.log(item.posts_pk);
        // await dispatch(action_get_posts());
      }
    },
    [dispatch, item?.liked[0]?.reaction],
  );
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
  const [isVisible, setisVisible] = useState(false);
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
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 1000,
  };
  return (
    <>
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
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipePostComment(direction, state)}
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
                    <Icons size={25} name={'close'} />
                  </TouchableHighlight>
                </View>
              </View>
              <ScrollView>
                {posts_comments.map(Notification => {
                  return (
                    <View key={Notification.posts_comment_pk}>
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
                                  overflow: 'hidden',
                                  borderRadius: 120 / 2,
                                }}
                              />
                            </View>
                            <View style={{width: 100 + '%', height: 100}}>
                              <View key={Notification.posts_comment_pk}>
                                <Text style={styles.containerNOTIFICATION}>
                                  {Notification?.fullname}:{'\n'}
                                  {Notification?.body}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
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
            </View>
          }
        />
      </GestureRecognizer>
    </>
  );
};

export default UILiked;
