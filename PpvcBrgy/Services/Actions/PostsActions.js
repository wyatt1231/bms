import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
import settings from '../../settings.json'; 
import {
  GET_POSTS_COMMENTS,
  GET_POSTS,
  GET_POSTS_INFO,
  GET_USER_POSTS,
  GET_POSTS_REACTION,
  GET_LIMITED_COMMENTS,
  GET_POSTS_reactions,
  GET_POSTS_PK,
} from '../Types/PostsTypes';

export const action_get_user_posts = () => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/postsMobile/getUserPosts`;
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
  if (parseData.success != false) {
    dispatch({
      type: GET_USER_POSTS,
      payload: parseData.data,
    });
  }
};
export const action_get_user_comments_limit = posts_pk => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/postsMobile/getcomments`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
        type: GET_LIMITED_COMMENTS,
        payload: parseData.data,
      });
    }
  }
};
export const action_get_posts = offset => async dispatch => {
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${settings.BASE_URL}/api/postsMobile/getPosts`;
  let formdata = new FormData();
  formdata.append('offset', offset);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.success) {
    dispatch({
      type: GET_POSTS,
      payload: {data: parseData.data, loading: parseData.success},
    });
  }
  console.log(parseData);
};
export const action_get_posts_info = posts_pk => async dispatch => {
  var url = `${settings.BASE_URL}/api/postsMobile/getSinglePostWithPhoto`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
        type: GET_POSTS_INFO,
        payload: parseData.data,
      });
    }
  }
};
export const action_posts_add_comment = (posts_pk, body) => async () => {
  var url = `${settings.BASE_URL}/api/postsMobile/addPostComment`;
  const token = await AsyncStorage.getItem('tokenizer');
  const user_pk = await AsyncStorage.getItem('user_id');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
  console.log(parseData);
};

export const action_set_posts_reactions =
  (posts_pk, reaction) => async dispatch => {
    //   var url = `${settings.BASE_URL}/api/user/currentUser`;
    var url = `${settings.BASE_URL}/api/postsMobile/addPostReaction`;
    const token = await AsyncStorage.getItem('tokenizer');
    const bearer_token = token;
    const bearer = 'Bearer ' + bearer_token;
    let formdata = new FormData();
    formdata.append('posts_pk', posts_pk);
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
    if (parseData.status != 400) {
      if (parseData.success != false) {
        dispatch({
          type: GET_POSTS_REACTION,
          payload: parseData.data,
        });
      }
    }
  };

export const action_get_posts_comments = posts_pk => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/postsMobile/getPostsComments`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
        type: GET_POSTS_COMMENTS,
        payload: parseData.data,
      });
    }
  }
  console.log(posts_pk);
};

export const action_get_posts_reactions = posts_pk => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/postsMobile/getreactions`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
        type: GET_POSTS_reactions,
        payload: parseData.data,
      });
    }
  }
};

export const action_set_posts = (title, body, upload_files) => async () => {
  var url = `${settings.BASE_URL}/api/postsMobile/addPosts`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('title', title);
  formdata.append('body', body);

  upload_files.forEach(item => {
    formdata.append('uploaded_files', item);
  });

  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      console.log(parseData);
    }
  }
  console.log(upload_files);
};

export const action_set_posts_pk = posts_pk => async dispatch => {
  dispatch({
    type: GET_POSTS_PK,
    payload: posts_pk,
  });
};
