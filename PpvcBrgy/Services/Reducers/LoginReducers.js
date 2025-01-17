import {SET_LOGIN} from '../Types/LoginTypes';

const userinfo = {
  data: [],
  loading: false,
};
const Login_Reducer = (data_state = userinfo, actions) => {
  switch (actions.type) {
    case SET_LOGIN:
      return {...data_state, data: actions.payload};

    default:
      return data_state;
  }
};
export default Login_Reducer;
