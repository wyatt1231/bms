import settings from '../../settings.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Actions} from 'react-native-router-flux';
import {
  GET_RESIDENTS_LIST,
  GET_RESIDENTS_ISSUCCESS,
  GET_RESIDENTS_FAD_DATA,
  GET_FORGOT_PASSWORD_PROMISE,
  GET_MEMBERS,
  GET_RELIGION_LIST,
  GET_NATIONALTIY_LIST,
  GET_FORMS,
} from '../Types/ResidentsTypes';

export const action_get_residents_list = searchname => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/residentmobile/getresidents`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('search', searchname);
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
        type: GET_RESIDENTS_LIST,
        payload: parseData.data,
      });
    }
  }
};

export const action_get_FAD_form = (resident_pk, fam_pk) => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/familymobile/getforms`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('ulo_pamilya', resident_pk);
  formdata.append('fam_pk', fam_pk);
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
        type: GET_FORMS,
        payload: {data: parseData.data, loading: parseData.success},
      });
    }
  }
};
export const action_get_FAD_exist = resident_pk => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/familymobile/getfamilyexist`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('ulo_pamilya', resident_pk);
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
        type: GET_RESIDENTS_FAD_DATA,
        payload: {data: parseData.data, loading: parseData.success},
      });
    }
  }
};

export const action_reset_password =
  (email, password, currentpassword) => async dispatch => {
    //   var url = `${settings.BASE_URL}/api/user/currentUser`;
    var url = `${settings.BASE_URL}/api/residentmobile/updatepassword`;
    const token = await AsyncStorage.getItem('tokenizer');
    const bearer_token = token;
    const bearer = 'Bearer ' + bearer_token;
    let formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('currentpassword', currentpassword);
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
          type: GET_FORGOT_PASSWORD_PROMISE,
          payload: {message: parseData.message, success: parseData.success},
        });
      } else {
        dispatch({
          type: GET_FORGOT_PASSWORD_PROMISE,
          payload: {message: parseData.message, success: parseData.success},
        });
      }
    } else {
      dispatch({
        type: GET_FORGOT_PASSWORD_PROMISE,
        payload: {message: parseData.message, success: parseData.success},
      });
    }
  };

export const action_forgot_password = (email, password) => async dispatch => {
  //   var url = `${settings.BASE_URL}/api/user/currentUser`;
  var url = `${settings.BASE_URL}/api/residentmobile/forgotpassword`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('email', email);
  formdata.append('password', password);
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
        type: GET_FORGOT_PASSWORD_PROMISE,
        payload: {message: parseData.message, success: parseData.success},
      });
    } else {
      dispatch({
        type: GET_FORGOT_PASSWORD_PROMISE,
        payload: {message: parseData.message, success: parseData.success},
      });
    }
  } else {
    dispatch({
      type: GET_FORGOT_PASSWORD_PROMISE,
      payload: {message: parseData.message, success: parseData.success},
    });
  }
};
export const action_addfamily =
  (
    resident_pk,
    okasyon_balay,
    straktura,
    kadugayon_pagpuyo,
    okasyon_yuta,
    kaligon_balay,
    waterconnection,
    hasComfortRoom,
    hasLightConnection,
    wastemanagement,
    kahimtang_komunidad,
    victimofabuse,
    serbisyo,
    fam_member,
  ) =>
  async dispatch => {
    //   var url = `${settings.BASE_URL}/api/user/currentUser`;
    var url = `${settings.BASE_URL}/api/family/addFamily`;
    const token = await AsyncStorage.getItem('tokenizer');
    const bearer_token = token;
    const bearer = 'Bearer ' + bearer_token;

    const fetchdata = await fetch(url, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ulo_pamilya: resident_pk,
        okasyon_balay: okasyon_balay,
        straktura: straktura,
        kadugayon_pagpuyo: kadugayon_pagpuyo,
        okasyon_yuta: okasyon_yuta,
        kaligon_balay: kaligon_balay,
        tinubdan_tubig: waterconnection,
        matang_kasilyas: hasComfortRoom,
        pasilidad_kuryente: hasLightConnection,
        matang_basura: wastemanagement,
        kahimtanang_komunidad: kahimtang_komunidad,
        biktima_pangabuso: victimofabuse,
        serbisyo_nadawat: serbisyo,
        fam_members: fam_member,
      }),
    });
    const parseData = await fetchdata.json();
    console.log(
      JSON.stringify({
        ulo_pamilya: resident_pk,
        okasyon_balay: okasyon_balay,
        straktura: straktura,
        kadugayon_pagpuyo: kadugayon_pagpuyo,
        okasyon_yuta: okasyon_yuta,
        kaligon_balay: kaligon_balay,
        tinubdan_tubig: waterconnection,
        matang_kasilyas: hasComfortRoom,
        pasilidad_kuryente: hasLightConnection,
        matang_basura: wastemanagement,
        kahimtanang_komunidad: kahimtang_komunidad,
        biktima_pangabuso: victimofabuse,
        serbisyo_nadawat: serbisyo,
        fam_members: fam_member,
      }),
    );
    console.log('Family Submit', parseData);
    if (parseData.success != false) {
      dispatch({
        type: GET_RESIDENTS_ISSUCCESS,
        payload: parseData.success,
      });
    }
  };
export const action_updatefamily =
  (
    fam_pk,
    resident_pk,
    okasyon_balay,
    straktura,
    kadugayon_pagpuyo,
    okasyon_yuta,
    kaligon_balay,
    waterconnection,
    hasComfortRoom,
    hasLightConnection,
    wastemanagement,
    kahimtang_komunidad,
    victimofabuse,
    serbisyo,
    fam_member,
  ) =>
  async dispatch => {
    //   var url = `${settings.BASE_URL}/api/user/currentUser`;
    var url = `${settings.BASE_URL}/api/family/updateFamily`;
    const token = await AsyncStorage.getItem('tokenizer');
    const bearer_token = token;
    const bearer = 'Bearer ' + bearer_token;

    const fetchdata = await fetch(url, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fam_pk: fam_pk,
        ulo_pamilya: resident_pk,
        okasyon_balay: okasyon_balay,
        straktura: straktura,
        kadugayon_pagpuyo: kadugayon_pagpuyo,
        okasyon_yuta: okasyon_yuta,
        kaligon_balay: kaligon_balay,
        tinubdan_tubig: waterconnection,
        matang_kasilyas: hasComfortRoom,
        pasilidad_kuryente: hasLightConnection,
        matang_basura: wastemanagement,
        kahimtanang_komunidad: kahimtang_komunidad,
        biktima_pangabuso: victimofabuse,
        serbisyo_nadawat: serbisyo,
        fam_members: fam_member,
      }),
    });
    const parseData = await fetchdata.json();
    if (parseData.success) {
      dispatch({
        type: GET_RESIDENTS_ISSUCCESS,
        payload: parseData.success,
      });
    }
  };
export const action_upadatenewuser = (user_pk,update) => async dispatch => {
  var url = `${settings.BASE_URL}/api/residentmobile/upadatenewuser`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;

  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_pk: user_pk,
      update:update,
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      console.log(parseData.success);
    }
  }
};
export const action_getmembers = resident_pk => async dispatch => {
  var url = `${settings.BASE_URL}/api/residentmobile/getmembers`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('resident_pk', resident_pk);
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
        type: GET_MEMBERS,
        payload: {data: parseData.data, loading: parseData.success},
      });
    }
  }
};
export const action_getmembers_ulosapamilya = fam_pk => async dispatch => {
  var url = `${settings.BASE_URL}/api/residentmobile/getmembers_ulosapamilya`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('fam_pk', fam_pk);
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
        type: GET_MEMBERS,
        payload: {data: parseData.data, loading: parseData.success},
      });
    }
  }
  console.log(parseData);
};

export const action_getreligion = () => async dispatch => {
  var url = `${settings.BASE_URL}/api/residentmobile/getreligion`;

  const fetchdata = await fetch(url, {
    method: 'POST',
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_RELIGION_LIST,
        payload: parseData.data,
      });
    }
  }
};

export const action_set_reset = reset => async dispatch => {
  dispatch({
    type: GET_RESIDENTS_ISSUCCESS,
    payload: reset,
  });
};

export const action_getnationality = () => async dispatch => {
  var url = `${settings.BASE_URL}/api/residentmobile/getnationality`;

  const fetchdata = await fetch(url, {
    method: 'POST',
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_NATIONALTIY_LIST,
        payload: parseData.data,
      });
    }
  }
};
