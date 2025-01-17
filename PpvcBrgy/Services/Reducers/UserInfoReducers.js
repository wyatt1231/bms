import {GET_USER_INFO} from '../Types/UserInfoTypes';

const userinfo = {
  data: [],
  loading: false,
};
const UserInfoReducers = (data_state = userinfo, actions) => {
  switch (actions.type) {
    case GET_USER_INFO:
      return {...data_state, data: actions.payload};

    default:
      return data_state;
  }
};
export default UserInfoReducers;
