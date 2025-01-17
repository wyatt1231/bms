import React, {useEffect, useState, useCallback} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import ComplaintsInfo from './ComplaintsInfo';
import {
  action_get_complaints_info,
  action_get_complaints_messages,
  action_set_complaints_messages,
  action_notify,
  action_complaint_info_reset,
} from '../../../Services/Actions/ComplaintsActions';
function ComplaintInfoMain(props) {
  const complaint_id = useSelector(
    (state) => state.ComplaintsReducers.complaint_id,
  );
  const complaint_info = useSelector(
    (state) => state.ComplaintsReducers.data_info,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const getcomplintsinfo = () => {
      if (mounted) {
        dispatch(action_complaint_info_reset());
        dispatch(action_get_complaints_info(complaint_id));
        dispatch(action_get_complaints_messages(complaint_id));
      }
    };

    mounted && getcomplintsinfo();
    return () => {
      mounted = false;
    };
  }, [dispatch, complaint_id]);

  return (
    <>
      {complaint_info?.length <= 0 ? (
        <Spinner visible={true} textContent={'Fetching Data...'} />
      ) : null}

      <ComplaintsInfo />
    </>
  );
}

export default ComplaintInfoMain;
