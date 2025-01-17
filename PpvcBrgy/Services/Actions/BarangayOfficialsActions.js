
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_DATA_BARANGAY} from '../Types/BarangaOfficialTypes';
import settings from '../../settings.json'; 
export const action_get_barangay_officials_list = () => async (dispatch) => {
  var url = `${settings.BASE_URL}/api/official/getBrgyOfficialList`;
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
  console.log(parseData)
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_DATA_BARANGAY,
        payload: parseData.data,
      });
    }
  }
};
