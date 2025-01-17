import {
  GET_NEWS_DATA,
  GET_NEWS_INFO,
  GET_COMMENTS,
  GET_NEWS_REACTION,
  SELECTED_FILTER,
  SELECTED_FILTER_MONTH,
} from '../Types/NewsTypes';
import {BASE_URL} from '../Types/Default_Types';
const news = {
  data: [],
  info: {data: [], loading: false},
  comments: [],
  reactions: [],
  // base_url: 'http://192.168.254.104:4050',
  base_url: BASE_URL,
  selected_filter_month: [{value: '', index: 0, text: ''}],
  selected_filter: [{value: '', index: 0, text: ''}],
};
const NewsReducers = (data_state = news, actions) => {
  switch (actions.type) {
    case GET_NEWS_DATA:
      return {...data_state, data: actions.payload};
    case GET_NEWS_INFO:
      return {...data_state, info: actions.payload};
    case GET_COMMENTS:
      return {...data_state, comments: actions.payload};
    case GET_NEWS_REACTION:
      return {...data_state, reactions: actions.payload};
    case BASE_URL:
      return {...data_state, base_url: actions.payload};
    case SELECTED_FILTER_MONTH:
      return {...data_state, selected_filter_month: actions.payload};
    case SELECTED_FILTER:
      return {...data_state, selected_filter: actions.payload};
    default:
      return data_state;
  }
};
export default NewsReducers;
