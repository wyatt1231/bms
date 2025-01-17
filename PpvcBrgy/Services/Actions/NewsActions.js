import {SET_DATA} from '../Types/LoginTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
import {
  GET_COMMENTS,
  GET_NEWS_DATA,
  GET_NEWS_INFO,
  GET_NEWS_REACTION,
  SELECTED_FILTER,
  SELECTED_FILTER_MONTH,
} from '../Types/NewsTypes';
import settings from '../../settings.json'; 
// export const action_get_news_bymonth = (month) => async (dispatch) => {
//   //   var url = `${settings.BASE_URL}/api/user/currentUser`;

// };

export const action_get_news_lastweek = () => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/newsmobile/getNewsDataPublishedLastWeek`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
  });
  const parseData = await fetchdata.json();
  dispatch({
    type: GET_NEWS_DATA,
    payload: parseData.data,
  });
};

export const action_get_news = () => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/newsmobile/getNewsDataPublished`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
  });
  const parseData = await fetchdata.json();

  dispatch({
    type: GET_NEWS_DATA,
    payload: parseData.data,
  });
};
export const action_get_news_info = news_pk => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/newsmobile/getSingleNewsWithPhoto`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('news_pk', news_pk);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();

  dispatch({
    type: GET_NEWS_INFO,
    payload: {data: parseData.data, loading: parseData.success},
  });
};

export const action_get_news_comments = news_pk => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/newsmobile/getNewsComments`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('news_pk', news_pk);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();

  dispatch({
    type: GET_COMMENTS,
    payload: parseData.data,
  });
};
export const action_set_news_reactions =
  (news_pk, reaction) => async dispatch => {
    //   var url = `${settings.BASE_URL}/api/user/currentUser`;
    var url = `${settings.BASE_URL}/api/newsmobile/addNewsReaction`;
    const token = await AsyncStorage.getItem('tokenizer');
    const bearer_token = token;
    const bearer = 'Bearer ' + bearer_token;
    let formdata = new FormData();
    formdata.append('news_pk', news_pk);
    formdata.append('reaction', reaction);
    const fetchdata = await fetch(url, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
      body: formdata,
    });
    const parseData = await fetchdata.json();

    dispatch({
      type: GET_NEWS_REACTION,
      payload: parseData.data,
    });
  };
export const action_get_news_add_comment = (news_pk, body) => async () => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/newsmobile/addNewsComment`;
  const token = await AsyncStorage.getItem('tokenizer');
  const user_pk = await AsyncStorage.getItem('user_id');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('news_pk', news_pk);
  formdata.append('user_pk', user_pk);
  formdata.append('body', body);
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
    }
  }
};
export const action_filter_news = (value, index, text) => async dispatch => {
  dispatch({
    type: SELECTED_FILTER_MONTH,
    payload: {value: value, index: index, text: text},
  });

  var url = `${settings.BASE_URL}/api/newsmobile/getNewsDataPublishedByMonth`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('month', value);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  console.log(parseData);
  dispatch({
    type: GET_NEWS_DATA,
    payload: parseData.data,
  });
};
export const action_filter = (value, index, text) => async dispatch => {
  dispatch({
    type: SELECTED_FILTER,
    payload: {value: value, index: index, text: text},
  });
  dispatch({
    type: GET_NEWS_DATA,
    payload: [],
  });
};
