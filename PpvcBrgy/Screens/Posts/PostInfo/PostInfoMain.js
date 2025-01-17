import React, {useEffect,useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_posts_info} from '../../../Services/Actions/PostsActions';
import PostsInfo from './PostsInfo';
import styles from './style';
function PostInfoMain(props) {
  const posts_pk = useSelector((state) => state.PostsReducers.posts_pk);
  const posts_info = useSelector((state) => state.PostsReducers.posts_info);
  const [getSpinner,setSpinner] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getpostsinfo = () => {
      if (mounted) {
        setSpinner(true)
        dispatch(action_get_posts_info(posts_pk));
        setSpinner(false)
      }
    };

    mounted && getpostsinfo();
    return () => {
      mounted = false;
    };
  }, [dispatch, posts_pk]);

    console.log(posts_info.length);
  return (
    <>
        <Spinner
          visible={getSpinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <PostsInfo />
    </>
  );
}

export default PostInfoMain;
