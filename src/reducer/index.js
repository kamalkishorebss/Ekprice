import { combineReducers } from 'redux';
import common from './ekpriceReducer';


const appReducer = combineReducers({
  common
})

export default appReducer