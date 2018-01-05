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