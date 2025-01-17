import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_get_FAD_exist,
  action_get_FAD_form,
} from '../../Services/Actions/ResidentsActions';
import FADForm from './FADForm';

function FADMain() {
  const resident_form = useSelector(
    state => state.ResidentReducers.resident_form,
  );
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let mounted = true;
  //   const index = () => {
  //     if (mounted) {
  //       dispatch(action_get_FAD_exist(users_reducers?.resident_pk));
  //     }
  //   };
  //   mounted && index();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (mounted) {
        dispatch(action_get_FAD_exist(users_reducers?.resident_pk));
        dispatch(
          action_get_FAD_form(
            users_reducers?.resident_pk,
            users_reducers?.fam_pk,
          ),
        );
        if (resident_form.data !== undefined) {
          setIsLoading(false);
        }
      }
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <>
      <Spinner visible={isLoading} textContent={'Fetching Data...'} />
      <FADForm />
    </>
  );
}

export default FADMain;
