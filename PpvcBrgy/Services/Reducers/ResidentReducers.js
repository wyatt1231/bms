import {
  GET_RESIDENTS_LIST,
  GET_RESIDENTS_ISSUCCESS,
  GET_RESIDENTS_FAD_DATA,
  GET_SINGLE_MEDICAL_RECORDS,
  GET_FORGOT_PASSWORD_PROMISE,
  GET_MEMBERS,
  GET_NATIONALTIY_LIST,
  GET_RELIGION_LIST,
  GET_FORMS
} from '../Types/ResidentsTypes';

const residentslist = {
  residents_list: [],
  single_medical_records: [],
  residents_exist_data: {data: [], loading: false},
  issuccess: false,
  forgotpassissuccess: {},
  members: {data: [], loading: false},
  religion_list: [],
  nationality_list: [],
  resident_form:{data:[],loading:false}
};
const ResidentReducers = (data_state = residentslist, actions) => {
  switch (actions.type) {
    case GET_RESIDENTS_LIST:
      return {...data_state, residents_list: actions.payload};
    case GET_RESIDENTS_ISSUCCESS:
      return {...data_state, issuccess: actions.payload};
    case GET_RESIDENTS_FAD_DATA:
      return {...data_state, residents_exist_data: actions.payload};
    case GET_SINGLE_MEDICAL_RECORDS:
      return {...data_state, single_medical_records: actions.payload};
    case GET_FORGOT_PASSWORD_PROMISE:
      return {...data_state, forgotpassissuccess: actions.payload};
    case GET_MEMBERS:
      return {...data_state, members: actions.payload};
    case GET_NATIONALTIY_LIST:
      return {...data_state, nationality_list: actions.payload};
    case GET_FORMS:
      return {...data_state, resident_form: actions.payload};

    case GET_RELIGION_LIST:
      return {...data_state, religion_list: actions.payload};

    default:
      return data_state;
  }
};
export default ResidentReducers;
