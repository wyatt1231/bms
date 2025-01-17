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
  Image,
  RefreshControl,
  TouchableHighlight,
  ImageBackground,
  Alert
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
//import Card from 'react-native-rn-Card';
//import {Actions} from 'react-native-router-flux';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';
import {
  action_get_news_comments,
  action_get_news_info,
  action_get_news_add_comment,
} from '../../Services/Actions/NewsActions';
import moment from 'moment';
import {Card} from 'react-native-elements';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import settings from '../../settings.json';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import RNFS from "react-native-fs";
import Icons from 'react-native-vector-icons/MaterialIcons';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const UINews = () => {
  const [offset, setoffset] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [news_id, setnews_id] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [visible, setvisible] = useState(false);
  const [carouselItems, setcarouselItems] = useState([]);

  const sheetRef = React.useRef(null);
  const [commentstate, setcommentstate] = useState(0);
  const [getmime, setmime] = useState(false);
  const dispatch = useDispatch();

  const base_url = useSelector((state) => state.NewsReducers.base_url);
  const news_reducers_info = useSelector((state) => state.NewsReducers.info);
  const news_reducers_comments = useSelector(
    (state) => state.NewsReducers.comments,
  );
  const [entries, setEntries] = useState([]);
  const [comment, setcomment] = useState('');
  const [title, settitle] = useState('');
  const [body, setbody] = useState('');
  const [images, setimages] = useState([]);
  const [getFileName, setFilename] = useState("");
  const [getFileType, setFileType] = useState("");


  const [isVisible, setisVisible] = useState(false);
  const ENTRIES1 = news_reducers_info?.data[0]?.upload_files;
  AsyncStorage.getItem('news_id').then(async (item) => {
    await setnews_id(item);
  });
  useEffect(() => {
    const getnewinfo = async () => {
      await dispatch(action_get_news_info(news_id));
      await setSpinner(true);
    };
    getnewinfo();
  }, [dispatch, news_id]);
  useEffect(() => {
    const initialize = async () => {
      if (news_reducers_info?.loading) {
        await setEntries(ENTRIES1);
        setFilename(ENTRIES1[0]?.file_path.split("/")[3]);
        setFileType(ENTRIES1[0]?.file_path.split(".")[1]);
        setmime(ENTRIES1[0].mimetype.includes("image"))
        news_reducers_info?.data[0]?.upload_files.map((i) => {
          setimages((prev) => [
            ...prev,
            {
              uri: `${settings.BASE_URL}/${i.file_path}`,
            },
          ]);
        });
      }
      await setSpinner(false);
    };
    initialize();
  }, [news_reducers_info,ENTRIES1]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  const fileTypeIcons = {
    pdf: 'picture-as-pdf',
    doc: 'description',
    docx: 'description',
    xls: 'grid-on',
    xlsx: 'grid-on',
    png: 'image',
    jpg: 'image',
    jpeg: 'image',
    txt: 'text-snippet',
    zip: 'zip-file',
    // Add more mappings as needed
  };
  const getFileIcon = (fileName) => {
    const extension = fileName.toLowerCase();
    const iconName = fileTypeIcons[extension] || 'insert-drive-file'; // Default icon if type is unknown
    return iconName;
  };
  const openFile = async (item) => {
    const fileName = item?.file_path.split("/")[3];
    const excelFileUrl = `${settings.BASE_URL}${item?.file_path}`;
    const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    try {
      try {
        const response = await RNFS.downloadFile({
          fromUrl: excelFileUrl,
          toFile: downloadDest,
        }).promise;
  
        if (response.statusCode === 200) {
          Alert.alert('Download Success', `File saved to ${downloadDest}`);
          // await FileViewer.open(downloadDest);
        } else {
          Alert.alert('Download Failed', `Status Code: ${response.statusCode}`);
        }
      } catch (error) {
        Alert.alert('Download Error', error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const RenderFile = useCallback(() => {
    return (   
    <TouchableHighlight onPress={() => openFile(ENTRIES1[0])}>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}> 
        <Icons name={getFileIcon(getFileType)} size={24} />
        <Text style={{ marginLeft: 10 }}>{getFileName}</Text>
      </View>
    </TouchableHighlight>
    )
  },
  [base_url,getFileName,getFileType],
);
  const renderItem = useCallback(({item, index}, parallaxProps) => {
      return(
        <View style={styles.item}>
          <ParallaxImage
            source={{uri: `${settings.BASE_URL}/${item?.file_path}`}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.1}
            {...parallaxProps}
          />
          {/* <Text style={styles.title} numberOfLines={2}>
          {item.filename}
        </Text> */}
        </View>
      )
    },
    [base_url],
  );
  const onChangeText = useCallback((text) => {
    setcomment(text);
  }, []);
  const handleCommentSend = useCallback(async () => {
    if (comment !== '') {
      await dispatch(action_get_news_add_comment(news_id, comment));
      await dispatch(action_get_news_comments(news_id));
      await setcommentstate((prev) => prev + 1);
      await setcomment('');
    }
  }, [dispatch, comment, news_id]);
  const handleCloseCommentButton = useCallback(async () => {
    setisVisible(false);
  }, []);
  const handleClickList = useCallback(() => {
    setisVisible(true);
  }, []);

  const onRefresh = useCallback(async () => {
    setSpinner(true);
    dispatch(action_get_news_info(news_id));
    if (news_reducers_info?.loading) {
      setSpinner(false);
      setEntries(ENTRIES1);
      settitle(news_reducers_info?.data[0]?.title);
      setbody(news_reducers_info?.data[0]?.body);
      setmime(ENTRIES1[0].mimetype.includes("image"))
    }
  }, [dispatch, ENTRIES1, news_id, news_reducers_info]);
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
    <SafeAreaView style={styles.flatlistcontainer}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setvisible(false)}
        />

        <Card
          style={{marginTop: -5}}
          radius={1}
          backgroundColor={'#ffffff'}>
          <View
            style={{
              flexDirection: 'row',
              height: getmime?300:50,
              alignItems: 'center',
            }}>
            <View style={styles.container}>
              {getmime ? 
              (
              <TouchableHighlight onPress={() => setvisible(true)}>
                <Carousel
                  ref={carouselRef}
                  sliderWidth={screenWidth}
                  sliderHeight={screenWidth}
                  itemWidth={screenWidth - 60}
                  data={entries}
                  renderItem={renderItem}
                  hasParallaxImages={true}
                  onPress={() => setvisible(true)}
                />
              </TouchableHighlight>
              ):(
                <RenderFile/>
              )}
              
            </View>
          </View>
          <Text style={styles.text}>
            {moment(news_reducers_info.data[0]?.encoded_at).calendar()}
          </Text>
        </Card>
        <View
          style={{
            flexDirection: 'row',
            height: screenHeight - 400,
            alignItems: 'center',
          }}>
          <Text style={styles.baseText}>
            <Text style={styles.textTitle}>
              {news_reducers_info.data[0]?.title}
            </Text>
            {'\n'}
            {'\n'}
            <Text style={styles.text}>{news_reducers_info.data[0]?.body}</Text>
          </Text>
        </View>
      </ScrollView>
      {/* <Text style={styles.commentlabel}>Comments</Text>
      <FlatList
        style={{
          backgroundColor: '#ffffff',
          marginTop: 10,
          maxHeight: 200,
        }}
        data={news_reducers_comments}
        keyExtractor={(item) => {
          return item?.news_comment_pk.toString();
        }}
        renderItem={(item) => {
          const Notification = item?.item;
          return (
            <TouchableHighlight
              underlayColor="white"
              onPress={() => handleClickList()}>
              <View style={styles.containerNOTIFICATION}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 50,
                  }}>
                  <View style={{width: 40 + '%', height: 20}}>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${Notification?.user_pic}`,
                      }}
                      style={{
                        marginTop: 10,
                        marginStart: 20,
                        width: 40,
                        height: 40,
                        borderRadius: 120 / 2,
                        overflow: 'hidden',
                        borderWidth: 3,
                      }}
                    />
                  </View>
                  <View style={{width: 95 + '%', height: 20}}>
                    <Card key={Notification.news_comment_pk}>
                      <Text style={styles.containerNOTIFICATION}>
                        {Notification?.fullname}
                        {'\n'}
                        {Notification?.body}
                      </Text>
                    </Card>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          padding: 25,
        }}>
        <Text style={styles.nameNOTIFICATION}>Comment</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 50,
          }}>
          <View style={{width: 95 + '%', height: 40}}>
            <TextInput
              style={{borderWidth: 2, borderColor: '#f7f5f5'}}
              multiline
              numberOfLines={4}
              onChangeText={(text) => onChangeText(text)}
              value={comment}
            />
          </View>
          <View style={{width: 20 + '%', height: 50}}>
            <Button
              icon={<Icon name="arrow-right" size={20} color="white" />}
              onPress={() => handleCommentSend()}
            />
          </View>
        </View>
      </View> */}
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
              <Card>
                <View style={styles.containerNOTIFICATION}>
                  <Text>Comments</Text>
                </View>
              </Card>
              {news_reducers_comments.map((Notification) => {
                return (
                  <Card key={Notification.news_comment_pk}>
                    <View style={styles.containerNOTIFICATION}>
                      <View style={styles.contentNOTIFICATION}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 50,
                          }}>
                          <View style={{width: 40 + '%', height: 20}}>
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
                          <View style={{width: 100 + '%', height: 20}}>
                            <Card key={Notification.news_comment_pk}>
                              <Text style={styles.containerNOTIFICATION}>
                                {Notification?.fullname}
                                {'\n'}
                                {Notification?.body}
                              </Text>
                            </Card>
                          </View>
                        </View>

                        <Text rkType="primary3 mediumLine"></Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </ScrollView>
          }
          Footer={
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
                        onChangeText={(text) => onChangeText(text)}
                        value={comment}
                      />
                    </View>
                    <View style={{width: 50, height: 50}}>
                      <Button
                        icon={
                          <Icon name="arrow-right" size={20} color="white" />
                        }
                        onPress={() => handleCommentSend()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          }
        />
      </GestureRecognizer>
    </SafeAreaView>

    // </ImageBackground>
  );
};
const styles = StyleSheet.create({
  containerNOTIFICATION: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  containerlist: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  text: {
    color: 'black',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    backgroundColor: '#000000a0',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  baseText: {
    textAlign: 'justify',
    padding: 15,
    color: 'black',
  },
  textTitle: {
    fontSize: 24,
    padding: 15,
    color: 'black',
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
  },
  flatlistcontainer: {
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    flex: 1,
    paddingTop: 10,
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

  contentNOTIFICATION: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeaderNOTIFICATION: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separatorNOTIFICATION: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  imageNOTIFICATION: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  timeNOTIFICATION: {
    fontSize: 11,
    color: '#808080',
  },
  nameNOTIFICATION: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentlabel: {
    fontSize: 16,
    marginStart: 10,
    fontWeight: 'bold',
  },
});
export default UINews;
