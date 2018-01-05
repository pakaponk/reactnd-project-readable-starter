import { 
    FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE,
    VOTE_POST_REQUEST, VOTE_POST_SUCCESS, VOTE_POST_FAILURE, 
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
    GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE
 } from '../actions/post.action'

 import {
    CREATE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS
 } from '../actions/comment.action'

const posts = (state = {
    isFetching: false,
    items: [],
    item: {},
    error: {}
}, action) => {
    switch(action.type) {
        case FETCH_POSTS_REQUEST:
        case VOTE_POST_REQUEST:
        case DELETE_POST_REQUEST:
        case GET_POST_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case VOTE_POST_FAILURE:
        case FETCH_POSTS_FAILURE:
        case DELETE_POST_FAILURE:
        case GET_POST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                items: state.items.map(item => item.id === action.comment.parentId ? {
                    ...item,
                    commentCount: item.commentCount + 1
                } : item),
                item: state.item.id === action.comment.parentId ? {
                    ...state.item,
                    commentCount: state.item.commentCount + 1
                } : state.item
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                items: state.items.map(item => item.id === action.comment.parentId ? {
                    ...item,
                    commentCount: item.commentCount - 1
                } : item),
                item: state.item.id === action.comment.parentId ? {
                    ...state.item,
                    commentCount: state.item.commentCount - 1
                } : state.item
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                error: {}
            }
        case VOTE_POST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: state.items.map(item => item.id === action.post.id ? action.post : item),
                item: state.item.id === action.post.id ? action.post : state.item,
                error: {}
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: state.items.filter(item => item.id !== action.post.id),
                item: state.item.id === action.post.id ? action.post : state.item,
                error: {}
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                item: action.post,
                error: {}
            }
        default:
            return state
    }
}

export default posts