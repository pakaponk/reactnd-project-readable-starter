import uuidv4 from 'uuid/v4'

const BASE_URL = 'http://localhost:3001'

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
const createPostRequest = () => ({
    type: CREATE_POST_REQUEST
})

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
const createPostSuccess = (post) => ({
    type: CREATE_POST_SUCCESS,
    post
})

export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'
const createPostFailure = (error) => ({
    type: CREATE_POST_FAILURE,
    error
})

export const createPost = (post) => {
    return async (dispatch) => {
        dispatch(createPostRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/posts`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...post,
                        id: uuidv4(),
                        timestamp: Date.now()
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'helloworld'
                    },
                }
            )
            const content = await response.json()
            return dispatch(createPostSuccess(content))
        } catch (error) {
            return Promise.reject(dispatch(createPostFailure(error)))
        }
    }
}

export const GET_POST_REQUEST = 'GET_POST_REQUEST'
const getPostRequest = () => ({
    type: GET_POST_REQUEST
})

export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const getPostSuccess = (post) => ({
    type: GET_POST_SUCCESS,
    post
})

export const GET_POST_FAILURE = 'GET_POST_FAILURE'
const getPostFailure = (error) => ({
    type: GET_POST_FAILURE,
    error
})

export const getPost = ({ id }) => {
    return async (dispatch) => {
        dispatch(getPostRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/posts/${id}`,
                {
                    headers: {
                        'Authorization': 'helloworld'
                    }
                }
            )
            const post = await response.json()
            return dispatch(getPostSuccess(post))
        } catch (error) {
            return Promise.reject(dispatch(getPostFailure(error)))
        }
    }
}

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
const editPostRequest = () => ({
    type: EDIT_POST_REQUEST
})

export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
const editPostSuccess = (post) => ({
    type: EDIT_POST_SUCCESS,
    post
})

export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'
const editPostFailure = (error) => ({
    type: EDIT_POST_FAILURE,
    error
})

export const editPost = (post) => {
    return async (dispatch) => {
        dispatch(editPostRequest())

        const { id, title, body } = post

        try {
            const response = await fetch(
                `${BASE_URL}/posts/${id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        title,
                        body
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'helloworld'
                    },
                }
            )
            const content = await response.json()
            return dispatch(editPostSuccess(content))
        } catch (error) {
            return Promise.reject(dispatch(editPostFailure(error)))
        }
    }
}