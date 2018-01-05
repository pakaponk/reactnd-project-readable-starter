import uuidv4 from 'uuid/v4'

const BASE_URL = 'http://localhost:3001'

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
const fetchPostsRequest = () => ({
    type: FETCH_POSTS_REQUEST
})

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
const fetchPostsSuccess = (posts) => ({
    type: FETCH_POSTS_SUCCESS,
    posts
})

export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
const fetchPostsFailure = (error) => ({
    type: FETCH_POSTS_FAILURE,
    error
})

export const fetchPosts = ({category = null}) => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest())

        const endpoint = category ? `${category}/posts` : 'posts'

        try {
            const response = await fetch(
                `${BASE_URL}/${endpoint}`,
                {
                    headers: {
                        'Authorization': 'helloworld'
                    }
                }
            )
            const posts = await response.json()
            return dispatch(fetchPostsSuccess(posts))
        } catch (error) {
            return Promise.reject(dispatch(fetchPostsFailure(error)))
        }
    }
}

export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST'
const votePostRequest = () => ({
    type: VOTE_POST_REQUEST
})

export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'
const votePostSuccess = (post) => ({
    type: VOTE_POST_SUCCESS,
    post
})

export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE'
const votePostFailure = (error) => ({
    type: VOTE_POST_FAILURE,
    error
})

export const votePost = (id, isUpVote) => {
    return async (dispatch) => {
        dispatch(votePostRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/posts/${id}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        option: isUpVote ? "upVote" : "downVote"
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'helloworld'
                    }
                }
            )
            const post = await response.json()
            return dispatch(votePostSuccess(post))
        } catch (error) {
            return dispatch(votePostFailure(error))
        }
    }
}

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
const deletePostRequest = () => ({
    type: DELETE_POST_REQUEST
})

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
const deletePostSuccess = (post) => ({
    type: DELETE_POST_SUCCESS,
    post
})

export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'
const deletePostFailure = (error) => ({
    type: DELETE_POST_FAILURE,
    error
})

export const deletePost = (id) => {
    return async (dispatch) => {
        dispatch(deletePostRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/posts/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'helloworld'
                    }
                }
            )
            const post = await response.json()
            return dispatch(deletePostSuccess(post))
        } catch (error) {
            return dispatch(deletePostFailure(error))
        }
    }
}

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