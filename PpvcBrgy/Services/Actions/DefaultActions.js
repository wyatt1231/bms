import { NETINFO, CHECK_NEW_USER} from '../Types/Default_Types';
import NetInfo from '@react-native-community/netinfo';
export const action_netinfo = () => (dispatch) => {
  NetInfo.fetch().then((state) => {
    console.log(state.isInternetReachable);
    if (state.isInternetReachable) {
      dispatch({
        type: NETINFO,
        payload: {isConnected: false, message: 'Connected'},
      });
    } else {
      dispatch({
        type: NETINFO,
        payload: {
          isConnected: true,
          message: 'No Internet Connection',
        },
      });
    }
  });
};

export const aciton_check_new_user = (checked) => (dispatch) => {
  dispatch({
    type: CHECK_NEW_USER,
    payload: checked,
  });
};
