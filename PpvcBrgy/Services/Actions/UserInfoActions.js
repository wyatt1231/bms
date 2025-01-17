import {SET_DATA} from '../Types/LoginTypes';
import settings from '../../settings.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
import {GET_USER_INFO} from '../Types/UserInfoTypes';

export const action_get_userinfo = () => async (dispatch) => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/user/userinfo`;
  const user_id = await AsyncStorage.getItem('user_id');
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('user_pk', user_id);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_USER_INFO,
        payload: parseData.data,
      });
    }
  } else {
    alert('Wrong Username/Password');
  }
};
