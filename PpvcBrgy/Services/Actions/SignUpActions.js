import settings from '../../settings.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
export const action_SignUp_user = (
  PhotoSingleFile,
  firstname,
  middlename,
  lastname,
  suffix,
  gender,
  birthdate,
  nationality,
  religion,
  civilstatus,
  purok,
  mobile,
  email,
  dialect,
  tribe,
  disability,
  isemployed,
  jobspecs,
  HouseIncome,
  HouseStatus,
  VotingPrecint,
  houseownedby,
  password,
) => async () => {
  var url = `${settings.BASE_URL}/api/residentmobile/addMobileResident`;

  let formdata = new FormData();
  formdata.append('pic', PhotoSingleFile);
  formdata.append('first_name', firstname);
  formdata.append('middle_name', middlename);
  formdata.append('last_name', lastname);
  formdata.append('suffix', suffix);
  formdata.append('gender', gender);
  formdata.append('birth_date', birthdate);
  formdata.append('nationality', nationality);
  formdata.append('religion', religion);
  formdata.append('civil_status', civilstatus);

  formdata.append('purok', purok);
  formdata.append('phone', mobile);
  formdata.append('email', email);
  formdata.append('dialect', dialect);
  formdata.append('tribe', tribe);

  formdata.append('with_disability', disability);
  formdata.append('is_employed', isemployed);
  formdata.append('employment', jobspecs);
  formdata.append('house_income', HouseIncome);
  formdata.append('house_status', HouseStatus);

  formdata.append('voting_precinct', VotingPrecint);
  formdata.append('house_ownership', houseownedby);
  formdata.append('password', password);
  formdata.append('encoder_pk', '0');
  console.log(PhotoSingleFile);
  const fetchdata = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      alert(parseData.message);
    } else {
      alert(parseData.message);
    }
  } else {
    alert(parseData.message);
  }
};
export const action_update_user = (
  resident_pk,
  user_pk,
  PhotoSingleFile,
  firstname,
  middlename,
  lastname,
  suffix,
  gender,
  birthdate,
  nationality,
  religion,
  civilstatus,
  purok,
  mobile,
  email,
  dialect,
  tribe,
  disability,
  isemployed,
  jobspecs,
  HouseIncome,
  houseownedby,
  grado,
) => async () => {
  var url = `${settings.BASE_URL}/api/residentmobile/updateMobileResident`;

  let formdata = new FormData();
  formdata.append('resident_pk', resident_pk);
  formdata.append('user_pk', user_pk);
  formdata.append('pic', PhotoSingleFile);
  formdata.append('first_name', firstname);
  formdata.append('middle_name', middlename);
  formdata.append('last_name', lastname);
  formdata.append('suffix', suffix);
  formdata.append('gender', gender);
  formdata.append('birth_date', birthdate);
  formdata.append('nationality', nationality);
  formdata.append('religion', religion);
  formdata.append('civil_status', civilstatus);

  formdata.append('purok', purok);
  formdata.append('phone', mobile);
  formdata.append('email', email);
  formdata.append('dialect', dialect);
  formdata.append('tribe', tribe);

  formdata.append('with_disability', disability);
  formdata.append('is_employed', isemployed);
  formdata.append('employment', jobspecs);
  formdata.append('house_income', HouseIncome);

  formdata.append('educ', grado);
  formdata.append('house_ownership', houseownedby);
  formdata.append('encoder_pk', '0');
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  const fetchdata = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      alert(parseData.message);
    } else {
      alert(parseData.message);
    }
  } else {
    alert(parseData.message);
  }
  console.log(parseData);
};
