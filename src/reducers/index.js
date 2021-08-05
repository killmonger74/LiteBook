import {combineReducers} from 'redux';
import posts from './post'
import postsucess from './postadded';
import mainerror from './errorreducer';
import loginreducer from './Loginreducer'
import isloading from './loading'
export default combineReducers({posts,postsucess,mainerror,loginreducer,isloading})