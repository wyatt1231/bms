import {
  GET_COMPLAINTS,
  GET_COMPLAINTS_INFO,
  GET_COMPLAINTS_MESSAGE,
  GET_COMPLAINTS_ID,
} from '../Types/Complaints_Types';
import {BASE_URL} from '../Types/Default_Types';
const complaints = {
  data: [],
  data_info: [],
  data_messages: [],
  base_url: BASE_URL,
  complaint_id: '',
};
const ComplaintsReducers = (data_state = complaints, actions) => {
  switch (actions.type) {
    case GET_COMPLAINTS_ID:
      return {...data_state, complaint_id: actions.payload};
    case GET_COMPLAINTS:
      return {...data_state, data: actions.payload};
    case GET_COMPLAINTS_INFO:
      return {...data_state, data_info: actions.payload};
    case GET_COMPLAINTS_MESSAGE:
      return {...data_state, data_messages: actions.payload};
    default:
      return data_state;
  }
};
export default ComplaintsReducers;
