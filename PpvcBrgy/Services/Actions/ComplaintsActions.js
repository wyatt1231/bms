
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GET_COMPLAINTS,
  GET_COMPLAINTS_ID,
  GET_COMPLAINTS_INFO,
  GET_COMPLAINTS_MESSAGE,
} from '../Types/Complaints_Types';
import {NOTIFY} from '../Types/Default_Types';
import settings from '../../settings.json'; 
export const action_get_complaints = (reported_by) => async (dispatch) => {
  var url = `${settings.BASE_URL}/api/complaintmobile/getComplaintList`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('reported_by', reported_by);
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
        type: GET_COMPLAINTS,
        payload: parseData.data,
      });
    }
  }
};

export const action_get_complaints_info = (complaint_pk) => async (
  dispatch,
) => {
  var url = `${settings.BASE_URL}/api/complaintmobile/getSingleComplaint`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('complaint_pk', complaint_pk);
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
        type: GET_COMPLAINTS_INFO,
        payload: parseData.data,
      });
    }
  }
};

export const action_insert_complaints = (
  subject,
  body,
  complaintType,
  complaint_file,
) => async () => {
  var url = `${settings.BASE_URL}/api/complaintmobile/addComplaint`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('subject', subject);
  formdata.append('body', body);
  formdata.append('type', complaintType);

if (Array.isArray(complaint_file) && complaint_file.length > 0) {
  complaint_file.forEach((item) => {
    formdata.append('uploaded_files', item);
  });
} else {
  console.log('No files to upload.');
}

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
    }
  }
};

export const action_get_complaints_messages = (complaint_pk) => async (
  dispatch,
) => {
  var url = `${settings.BASE_URL}/api/complaintmobile/getComplaintMessage`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('complaint_pk', complaint_pk);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(complaint_pk);
      if (res.success) {
        dispatch({
          type: GET_COMPLAINTS_MESSAGE,
          payload: res.data,
        });
      }
    });
};

export const action_set_complaints_messages = (body, complaint_pk) => async (
  dispatch,
) => {
  var url = `${settings.BASE_URL}/api/complaintmobile/addComplaintMessage`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('body', body);
  formdata.append('complaint_pk', complaint_pk);
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

export const action_notify = (notify) => async (dispatch) => {
  dispatch({
    type: NOTIFY,
    payload: notify,
  });
};

export const action_complaint_info_reset = () => async (dispatch) => {
  dispatch({
    type: GET_COMPLAINTS_INFO,
    payload: [],
  });
};
export const action_get_complaint_id = (complaint_id) => async (dispatch) => {
  dispatch({
    type: GET_COMPLAINTS_ID,
    payload: complaint_id,
  });
};
