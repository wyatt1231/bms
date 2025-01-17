import {SET_DATA} from '../Types/LoginTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
import {useNavigation} from '@react-navigation/native';
import settings from '../../settings.json'; 
export const action_Login_user = (email, password) => async () => {
  const value = await AsyncStorage.getItem('tokenizer');
  var url = `${settings.BASE_URL}/api/user/login`;
  let formdata = new FormData();
  formdata.append('email', email);
  formdata.append('password', password);
  const fetchdata = await fetch(url, {
    method: 'POST',
    body: formdata,
  });
  const parseData = await fetchdata.json();
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
      alert('Wrong Username/Password');
    }
  } else {
    console.log('Wrong Username/Password');
  }
};
