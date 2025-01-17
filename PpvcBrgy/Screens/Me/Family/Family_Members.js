import React, {useEffect, useState} from 'react';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Lists from './Lists';
import {action_getmembers,action_getmembers_ulosapamilya} from '../../../Services/Actions/ResidentsActions';
const Family_Members = () => {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if(users_reducers?.fam_pk!==""){
          dispatch(action_getmembers_ulosapamilya(users_reducers?.fam_pk))
      }else{
        dispatch(action_getmembers(users_reducers?.resident_pk));
      }
    
    };
    mounted && index();
    return () => {mounted = false};
  }, [dispatch]);
  return <Lists />;
};

export default Family_Members;
