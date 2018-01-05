import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux' 

import posts from './post.reducer'
import categories from './category.reducer'
import comments from './comment.reducer'

export default combineReducers({
    posts,
    categories,
    comments,
    router: routerReducer
})