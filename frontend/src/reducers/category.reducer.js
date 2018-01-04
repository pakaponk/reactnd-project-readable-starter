
import {
    FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE
} from '../actions/category.action'

const categories = (state = {
    isFetching: false,
    items: [],
    error: {}
}, action) => {
    switch(action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.categories
            }
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state
    }
}

export default categories