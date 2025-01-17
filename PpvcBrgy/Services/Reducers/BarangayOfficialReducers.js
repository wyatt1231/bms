import {GET_DATA_BARANGAY} from '../Types/BarangaOfficialTypes';
import {BASE_URL} from '../Types/Default_Types';
const barangay_officials = {
  data_barangay: [],
  base_url: BASE_URL,
};
const BarangayOfficialReducers = (data_state = barangay_officials, actions) => {
  switch (actions.type) {
    case GET_DATA_BARANGAY:
      return {...data_state, data_barangay: actions.payload};
    default:
      return data_state;
  }
};
export default BarangayOfficialReducers;
