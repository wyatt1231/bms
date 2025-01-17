import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
// import CustomNotification from '../../Plugins/CustomNotification';
import MeScreen from '../Me/MeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_userinfo} from '../../Services/Actions/UserInfoActions';
import {action_notify} from '../../Services/Actions/ComplaintsActions';
import {
  action_netinfo,
  aciton_check_new_user,
} from '../../Services/Actions/DefaultActions';
import {action_get_complaints} from '../../Services/Actions/ComplaintsActions';
import {View} from 'react-native';
import io from 'socket.io-client';
import {useNavigation} from '@react-navigation/native';
import {compose} from 'redux';
import CustomSnackBar from '../../Plugins/CustomSnackBar';
import settings from '../../settings.json';
import {useBackHandler} from '@react-native-community/hooks';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function NewsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="News Feed"
//       screenOptions={{headerShown: false, headerLeft: null}}>
//       <Stack.Screen name="News Feed" component={NewsFeed} />
//     </Stack.Navigator>
//   );
// }
// function PostsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Posts"
//       screenOptions={{headerShown: false, headerLeft: null}}>
//       <Stack.Screen name="Posts" component={Posts} />
//     </Stack.Navigator>
//   );
// }

// function BarangayStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Brgy. Officials"
//       screenOptions={{headerShown: false, headerLeft: null}}>
//       <Stack.Screen name="Brgy. Officials" component={BarangayOfficials} />
//     </Stack.Navigator>
//   );
// }

// function MeStack() {
//   return (
//     <Stack.Navigator initialRouteName="Me" screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Me" component={MeScreen} />
//     </Stack.Navigator>
//   );
// }

// function SettingsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Settings"
//       screenOptions={{
//         headerStyle: {backgroundColor: '#42f44b'},
//         headerTintColor: '#fff',
//         headerTitleStyle: {fontWeight: 'bold'},
//       }}>
//       <Stack.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{title: 'Setting Page'}}
//       />
//       <Stack.Screen
//         name="Details"
//         component={DetailsScreen}
//         options={{title: 'Details Page'}}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{title: 'Profile Page'}}
//       />
//     </Stack.Navigator>
//   );
// }

function BottomNavigation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [token, settoken] = useState('');
  const [reported_by, setreported_by] = useState('');
  const [complaint_pk, setcomplaint_pk] = useState('');
  const notify = useSelector(state => state.Default_Reducer.notify);
  const base_url = useSelector(state => state.NewsReducers.base_url);
  const complaintslist = useSelector(state => state.ComplaintsReducers.data);
  const netinformation = useSelector(state => state.Default_Reducer.netinfo);
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  AsyncStorage.getItem('tokenizer').then(item => {
    if (item === null) {
      navigation.navigate('Home');
      //Actions.home();
    }
    settoken(item);
  });
  AsyncStorage.getItem('user_id').then(item => {
    if (item === null) {
      navigation.navigate('Home');
      //Actions.home();
    } else {
      setreported_by(item);
    }
  });
  AsyncStorage.getItem('complaint_pk').then(async item => {
    await setcomplaint_pk(item);
  });
  const [Visible, setVisible] = useState(true);
  const [didMount, setDidMount] = useState(false);
  const [isConnected, setisConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    let mounted = true;

    const notify = async () => {
      socketRef.current = io(`${settings.BASE_URL}/socket/complaint/chat`, {
        query: {
          token: token,
        },
      });

      await socketRef.current.on('connected', data => {
        console.log('this =>' + data);
      });

      await socketRef.current.emit('joinRoom', complaint_pk);

      await socketRef.current.on('allMessage', () => {
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
      });
      await socketRef.current.on('failedMessage', error => {
        console.log(error);
      });

      return () => {
        socketRef?.current?.disconnect();
      };
    };

    mounted && notify();
    return () => (mounted = false);
  }, [
    complaintslist,
    token,
    dispatch,
    reported_by,
    netinformation?.isConnected,
  ]);

  useEffect(() => {
    let mounted = true;
    const netinfo = async () => {
      await dispatch(action_get_userinfo());
      await dispatch(action_netinfo());
      if ((await users_reducers.new_user) === 'true') {
        await dispatch(aciton_check_new_user(true));
      } else {
        await dispatch(aciton_check_new_user(false));
      }
    };
    mounted && netinfo();
    return () => (mounted = false);
  }, [dispatch, isConnected, users_reducers.new_user]);
  useBackHandler(async () => {
    if (navigation.canGoBack()) {
      const val = await AsyncStorage.getItem('tokenizer');
      if (val !== null) {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Home');
      }
      return true;
    }
    return false;
  });
  return (
    <View>
      {/* <CustomNotification
        title={notify[0]?.title}
        subTitle={notify[0]?.message}
        show={notify[0]?.notify}
      /> */}
      <MeScreen />
      <CustomSnackBar
        show={netinformation?.isConnected}
        message={netinformation?.message}
      />
    </View>
    // <NavigationContainer>
    //   <Tab.Navigator
    //     initialRouteName="Home"
    //     tabBarOptions={{
    //       activeTintColor: '#3b5998',
    //     }}>
    //     <Tab.Screen
    //       name="NewsStack"
    //       component={NewsStack}
    //       options={{
    //         tabBarLabel: 'News Feed',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons
    //             name="compass"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="PostsStack"
    //       component={PostsStack}
    //       options={{
    //         tabBarLabel: 'Posts',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons name="post" color={color} size={size} />
    //         ),
    //       }}
    //     />

    //     <Tab.Screen
    //       name="Brgy.Officials"
    //       component={BarangayStack}
    //       options={{
    //         tabBarLabel: 'Brgy.Officials',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons
    //             name="account-cowboy-hat"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />

    //     <Tab.Screen
    //       name="MeStack"
    //       component={MeStack}
    //       options={{
    //         tabBarLabel: 'Me',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons
    //             name="account"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}
export default BottomNavigation;
