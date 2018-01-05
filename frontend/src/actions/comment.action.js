import uuidv4 from 'uuid/v4'

const BASE_URL = 'http://localhost:3001'

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST'
const fetchCommentsRequest = () => ({
    type: FETCH_COMMENTS_REQUEST
})

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
const fetchCommentsSuccess = (comments) => ({
    type: FETCH_COMMENTS_SUCCESS,
    comments
})

export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'
const fetchCommentsFailure = (error) => ({
    type: FETCH_COMMENTS_FAILURE,
    error
})

export const fetchComments = ({postId}) => {
    return async (dispatch) => {
        dispatch(fetchCommentsRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/posts/${postId}/comments`,
                {
                    headers: {
                        'Authorization': 'helloworld'
                    }
                }
            )
            const comments = await response.json()
            return dispatch(fetchCommentsSuccess(comments))
        } catch (error) {
            return Promise.reject(dispatch(fetchCommentsFailure(error)))
        }
    }
}

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST'
const createCommentRequest = () => ({
    type: CREATE_COMMENT_REQUEST
})

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
const createCommentSuccess = (comment) => ({
    type: CREATE_COMMENT_SUCCESS,
    comment
})

export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE'
const createCommentFailure = (error) => ({
    type: CREATE_COMMENT_FAILURE,
    error
})

export const createComment = ({parentId, comment}) => {
    return async (dispatch) => {
        dispatch(createCommentRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/comments`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...comment,
                        parentId,
                        id: uuidv4(),
                        timestamp: Date.now()
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'helloworld'
                    }
                }
            )
            const newComment = await response.json()
            return dispatch(createCommentSuccess(newComment))
        } catch (error) {
            return Promise.reject(dispatch(createCommentFailure(error)))
        }
    }
}

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST'
const deleteCommentRequest = () => ({
    type: DELETE_COMMENT_REQUEST
})

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
const deleteCommentSuccess = (comment) => ({
    type: DELETE_COMMENT_SUCCESS,
    comment
})

export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'
const deleteCommentFailure = (error) => ({
    type: DELETE_COMMENT_FAILURE,
    error
})

export const deleteComment = ({id}) => {
    return async (dispatch) => {
        dispatch(deleteCommentRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/comments/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'helloworld'
                    }
                }
            )
            const deletedComment = await response.json()
            return dispatch(deleteCommentSuccess(deletedComment))
        } catch (error) {
            return Promise.reject(dispatch(deleteCommentFailure(error)))
        }
    }
}

export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST'
const voteCommentRequest = () => ({
    type: VOTE_COMMENT_REQUEST
})

export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS'
const voteCommentSuccess = (comment) => ({
    type: VOTE_COMMENT_SUCCESS,
    comment
})

export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE'
const voteCommentFailure = (error) => ({
    type: VOTE_COMMENT_FAILURE,
    error
})

export const voteComment = ({ id, isUpVote }) => {
    return async (dispatch) => {
        dispatch(voteCommentRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/comments/${id}`,
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
            const comment = await response.json()
            return dispatch(voteCommentSuccess(comment))
        } catch (error) {
            return Promise.reject(dispatch(voteCommentFailure(error)))
        }
    }
}

export const GET_COMMENT_REQUEST = 'GET_COMMENT_REQUEST'
const getCommentRequest = () => ({
    type: GET_COMMENT_REQUEST
})

export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS'
const getCommentSuccess = (comment) => ({
    type: GET_COMMENT_SUCCESS,
    comment
})

export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE'
const getCommentFailure = (error) => ({
    type: GET_COMMENT_FAILURE,
    error
})

export const getComment = ({id}) => {
    return async (dispatch) => {
        dispatch(getCommentRequest())

        try {
            const response = await fetch(
                `${BASE_URL}/comments/${id}`,
                {
                    headers: {
                        'Authorization': 'helloworld'
                    }
                }
            )
            const comment = await response.json()

            if (Object.keys(comment).length){
                return dispatch(getCommentSuccess(comment))
            }
            else {
                return Promise.reject(getCommentFailure({message: "Not Found"}))
            }
        } catch (error) {
            return Promise.reject(dispatch(getCommentFailure(error)))
        }
    }
}

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST'
const editCommentRequest = () => ({
    type: EDIT_COMMENT_REQUEST
})

export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'
const editCommentSuccess = (comment) => ({
    type: EDIT_COMMENT_SUCCESS,
    comment
})

export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE'
const editCommentFailure = (error) => ({
    type: EDIT_COMMENT_FAILURE,
    error
})

export const editComment = (comment) => {
    return async (dispatch) => {
        dispatch(editCommentRequest())

        const { id, body } = comment

        try {
            const response = await fetch(
                `${BASE_URL}/comments/${id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        body,
                        timestamp: Date.now()
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'helloworld'
                    },
                }
            )
            const content = await response.json()
            return dispatch(editCommentSuccess(content))
        } catch (error) {
            return Promise.reject(dispatch(editCommentFailure(error)))
        }
    }
}