import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {ActionSheetIOS} from 'react-native';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  ButtonGroup,
  Badge,
  Icon,
  withBadge,
} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
//import Card from 'react-native-rn-Card';
//import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../../Plugins/waitinterval';
import {
  action_get_news,
  action_get_news_comments,
  action_set_news_reactions,
  action_get_news_add_comment,
  action_filter_news,
  action_get_news_lastweek,
  // action_get_news_bymonth,
  action_filter,
} from '../../../Services/Actions/NewsActions';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {HelperText} from 'react-native-paper';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import settings from '../../../settings.json';
const NewsFeed = () => {
  const news_reducers = useSelector(state => state.NewsReducers.data);
  const base_url = useSelector(state => state.NewsReducers.base_url);
  const selected_filter = useSelector(
    state => state.NewsReducers.selected_filter,
  );
  const navigation = useNavigation();
  const selected_filter_month = useSelector(
    state => state.NewsReducers.selected_filter_month,
  );
  const [offset, setoffset] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [isvisible, setvisible] = useState(false);
  const [news_id, setnews_id] = useState('');

  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const handleSelectedMonth = useCallback(
    async (value, index) => {
      dispatch(action_filter_news(value, index, value)).then(res => {
        setRefreshing(false);
      });
      // dispatch(action_get_news_bymonth(value));
    },
    [dispatch],
  );
  const handleSelectedFilter = useCallback(
    (value, index) => {
      dispatch(action_filter(value, index, value));
      if (value !== 'month') {
        setvisible(false);
        if (value === 'today') {
          dispatch(action_get_news());
        } else {
          dispatch(action_get_news_lastweek());
        }
      } else {
        dispatch(action_get_news_lastweek());
        setvisible(false);
      }
    },
    [dispatch],
  );
  // const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_news());
    });
  }, [dispatch]);

  const loadmore = async () => {
    setSpinner(true);
    setInterval(() => {
      setSpinner(false);
    }, 1000);
    setoffset(prev => prev + 10);
    // await dispatch(action_get_news());
  };
  const gotonewsinfo = useCallback(async item => {
    await AsyncStorage.setItem('news_id', item?.news_pk.toString());
    navigation.navigate('News Info');
    //await //Actions.index();newsinfo();
  }, []);

  const updateIndex = useCallback(
    (item, index) => {
      setnews_id(item?.news_pk);
      dispatch(action_get_news_comments(item?.news_pk));
      if (index !== 0) {
        setisVisible(true);
      } else {
        dispatch(action_set_news_reactions(item?.news_pk, 'Like'));
        dispatch(action_get_news());
      }
    },
    [dispatch],
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
  const component2 = () => {
    return (
      <Text>
        <Icons name="comment" size={15} color="grey" /> Comment
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];
  var months = [
    {month: 'January', number: 1},
    {month: 'February', number: 2},
    {month: 'March', number: 3},
    {month: 'April', number: 4},
    {month: 'May', number: 5},
    {month: 'June', number: 6},
    {month: 'July', number: 7},
    {month: 'August', number: 8},
    {month: 'September', number: 9},
    {month: 'October', number: 10},
    {month: 'November', number: 11},
    {month: 'December', number: 12},
  ];
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <View style={{flexDirection: 'row', paddingLeft: 15}}>
        <View style={{width: '50%'}}>
          <HelperText type="info" visible={true} padding="none">
            Filter Data
          </HelperText>
          <Picker
            selectedValue={selected_filter?.value}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              handleSelectedFilter(itemValue, itemIndex)
            }>
            <Picker.Item key={0} label="Today" value="today" />
            <Picker.Item key={1} label="Last Week" value="week" />
            <Picker.Item key={2} label="By Month" value="month" />
          </Picker>
        </View>
        {selected_filter?.value === 'month' ? (
          <View style={{width: '50%'}}>
            <HelperText type="info" visible={isvisible} padding="none">
              Months
            </HelperText>
            <Picker
              selectedValue={selected_filter_month?.value}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                handleSelectedMonth(itemValue, itemIndex)
              }>
              {months.map(item => (
                <Picker.Item
                  key={item.number}
                  label={item.month}
                  value={item.number}
                />
              ))}
            </Picker>
          </View>
        ) : null}
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={news_reducers}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotonewsinfo(item)}
            underlayColor="white">
            <Card style={{marginBottom: 5}}  containerStyle={{borderRadius:15,elevation:5,marginBottom:5}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 300,
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{
                    uri: `${settings.BASE_URL}/${item?.upload_files[0]?.file_path}`,
                  }}
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
              {/* <View
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
              /> */}
            </Card>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>

    //  </ImageBackground>
  );
};

export default NewsFeed;
