import {combineReducers} from 'redux';
import Login_Reducer from './LoginReducers';
import Default_Reducer from './Default_Reducers';
import UserInfoReducers from './UserInfoReducers';
import NewsReducers from './NewsReducers';
import ComplaintsReducers from './ComplaintsReducers';
import BarangayOfficialReducers from './BarangayOfficialReducers';
import ResidentReducers from './ResidentReducers';
import PostsReducers from './PostsReducers';
const Root_Reducer = combineReducers({
  Login_Reducer: Login_Reducer,
  Default_Reducer: Default_Reducer,
  UserInfoReducers: UserInfoReducers,
  NewsReducers: NewsReducers,
  ComplaintsReducers: ComplaintsReducers,
  BarangayOfficialReducers: BarangayOfficialReducers,
  PostsReducers: PostsReducers,
  ResidentReducers: ResidentReducers,
});
export default Root_Reducer;
