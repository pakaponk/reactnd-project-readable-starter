
import {
    FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE,
    CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE, 
    DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, 
    VOTE_COMMENT_REQUEST, VOTE_COMMENT_FAILURE, VOTE_COMMENT_SUCCESS, GET_COMMENT_REQUEST, GET_COMMENT_FAILURE, GET_COMMENT_SUCCESS
} from '../actions/comment.action'

const comments = (state = {
    isFetching: false,
    items: [],
    item: {},
    error: {}
}, action) => {
    switch(action.type) {
        case FETCH_COMMENTS_REQUEST:
        case CREATE_COMMENT_REQUEST:
        case DELETE_COMMENT_REQUEST:
        case VOTE_COMMENT_REQUEST:
        case GET_COMMENT_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: {}
            }
        case FETCH_COMMENTS_FAILURE:
        case CREATE_COMMENT_FAILURE:
        case DELETE_COMMENT_FAILURE:
        case VOTE_COMMENT_FAILURE:
        case GET_COMMENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.comments,
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: [...state.items, action.comment],
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: state.items.filter(item => item.id !== action.comment.id)
            }
        case VOTE_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: state.items.map(item => item.id === action.comment.id ? action.comment : item),
            }
        case GET_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                item: action.comment
            }
        default:
            return state
    }
}

export default comments