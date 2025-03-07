import {SET_DATA} from '../Types/LoginTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
import {useNavigation} from '@react-navigation/native';
import settings from '../../settings.json'; 
export const action_Login_user = (email, password) => async () => {
  const value = await AsyncStorage.getItem('tokenizer');
  settings.BASE_URL = await AsyncStorage.getItem('BASE_API_URL');
  var url = `${settings.BASE_URL}/api/user/login`;
  let formdata = new FormData();
  formdata.append('email', email);
  formdata.append('password', password);
  const fetchdata = await fetch(url, {
    method: 'POST',
    body: formdata,
  });
  console.log("fetchdata",fetchdata);

  const parseData = await fetchdata.json();
  console.log("parseData",parseData);
  console.log("parseData data",parseData.data);

  if (parseData.status != 400) {
    if (parseData.success != false) {
      if (parseData.data.user.allow_login !== 'y') {
        alert('Your account still under verification');
        return false;
      } else {
        await AsyncStorage.setItem('tokenizer', parseData.data.token);
        await AsyncStorage.setItem(
          'user_id',
          parseData.data.user.user_pk.toString(),
        );
        await AsyncStorage.setItem('email', email);
        //Actions.index();
        return true;
      }
    } else {
      alert(parseData.message ? parseData.message : 'Wrong Username/Password');
    }
  } else {
    console.log('Wrong Username/Password');
  }
};
