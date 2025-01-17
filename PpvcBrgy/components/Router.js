import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/LoginScreen';
import SignUp from '../Screens/SignUpScreen';
import Index from '../Screens/Main/BottomNavigation';
import NewsFeed from '../Screens/News/NewsFeed/NewsFeedMain';
import NewsInfo from '../Screens/News/NewsInfo';
import PostsInfo from '../Screens/Posts/PostInfo/PostInfoMain';
import Complaints from '../Screens/Complaints/ComplaintList/ComplaintListMain';
import ComplaintsInfo from '../Screens/Complaints/ComplaintInfo/ComplaintInfoMain';
import FADForm from '../Screens/FamilyAssesmentData/FADForm';
import FADMain from '../Screens/FamilyAssesmentData/FADMain';
import MeInfo from '../Screens/Me/MeInfo';
import Posts from '../Screens/Posts/PostsFeed/PostsMain';
import BarangayOfficials from '../Screens/BarangayOfficials/OfficialsMain';
import ResetPassword from '../Screens/Me/ResetPassword';
import UpdateInfo from '../Screens/Me/UpdateInfo';
import Settings from '../Screens/Me/Settings';
import Family_Members from '../Screens/Me/Family/Family_Members';
import {navigationRef} from './RootNavigation';
import {logo} from '../assets/icons/applogo.jpg';


const Stack = createNativeStackNavigator();

const RouterHook = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sign up"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Index}
          // options={{headerShown: false}}
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff",
            headerBackVisible:false,
            headerTitle:"Home",
          }}
        />
        <Stack.Screen
          name="News"
          component={NewsFeed}
          title="News"
          // navBarButtonColor="#623256"
          // titleStyle={{color: '#623256'}}
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
          
        />
        <Stack.Screen
          name="News Info"
          component={NewsInfo}
          title="News Info"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
               headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff",
            
          }}
        />
        <Stack.Screen
          name="Post Info"
          component={PostsInfo}
          title="Posts"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
        <Stack.Screen
          name="Posts"
          component={Posts}
          title="Posts"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
        <Stack.Screen
          name="Officials"
          component={BarangayOfficials}
          title="Officials"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
        <Stack.Screen
          name="My Profile"
          component={MeInfo}
          title="My Profile"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
        <Stack.Screen
          name="Reset Password"
          component={ResetPassword}
          title="Reset Password"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
        <Stack.Screen
          name="Update Information"
          component={UpdateInfo}
          title="Update Information"
        />
        <Stack.Screen
          name="My Family Members"
          component={Family_Members}
          title="My Family Members"
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          title="Settings"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
        <Stack.Screen
          name="Family Assessment Data Form"
          component={FADMain}
          title="Family Assessment Data Form"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />

        <Stack.Screen
          name="Complaint Info"
          component={ComplaintsInfo}
          title="Complaint Info"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
        <Stack.Screen
          name="List of Complaints"
          component={Complaints}
          title="List of Complaints"
          // titleStyle={{color: '#623256'}}
          // navBarButtonColor="#623256"
          options={{
            headerTitleStyle: {
              color: '#ffffff',
            },
              headerStyle:{
              backgroundColor:"#623256"
            },
            headerTintColor:"#ffffff"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouterHook;
