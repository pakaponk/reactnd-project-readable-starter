import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPost } from '../actions/post.action'
import { fetchComments, createComment } from '../actions/comment.action'

import PostListItem from "./PostListItem";
import CommentForm from "./CommentForm";
import CommentListItem from './CommentListItem';

class PostDetail extends Component {
    
    componentDidMount() {

        this.props.getPost(this.props.match.params.post_id)
        .catch(action => {
            console.log(action.error.message)
            if (action.error.message === "Not Found") {
                this.props.history.push('/')
            }
        })
        
        this.props.fetchComments(this.props.match.params.post_id)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.posts.item.deleted) {
            this.props.history.push('/')
        }
    }

    render() {
        const { posts, comments } = this.props
        const post = posts.item

        return (
            <div>
                <PostListItem  post={post} />

                <h5>Total Comments: {post.commentCount}</h5>

                <div className="py-3">
                    { comments.items.length ? comments.items.map(comment => (
                        <CommentListItem key={comment.id} comment={comment} />
                    )) : (
                        <div className="p-5 bg-light text-center rounded">
                            <h3 className="text-muted">No Comments</h3>
                        </div>
                    ) }
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="my-3">Create new Comment</h5>
                            <CommentForm parentId={post.id} submit={this.props.createComment} /> 
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.comments,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => dispatch(getPost({id})),
        fetchComments: (postId) => dispatch(fetchComments({postId})),
        createComment: (parentId, comment) => (dispatch(createComment({parentId, comment})))
    }
}

const PostDetailContainer = connect(mapStateToProps, mapDispatchToProps)(PostDetail)

export default PostDetailContainer