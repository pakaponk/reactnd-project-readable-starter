const BASE_URL = 'http://localhost:3001'

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST
})

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    categories
})

export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'
const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    error
})

export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/categories`,
                {
                    headers: {
                        'Authorization': 'helloworld'
                    }
                }
            )
            const content = await response.json()
            return dispatch(fetchCategoriesSuccess(content.categories))
        } catch (error) {
            return dispatch(fetchCategoriesFailure(error))
        }
    }
}