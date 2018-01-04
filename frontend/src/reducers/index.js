import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux' 

import categories from './category.reducer'

export default combineReducers({
    categories,
})