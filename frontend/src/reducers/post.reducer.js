import { 
    GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE
 } from '../actions/post.action'

const posts = (state = {
    isFetching: false,
    items: [],
    item: {},
    error: {}
}, action) => {
    switch(action.type) {
        case GET_POST_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_POST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
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