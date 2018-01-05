import React, { Component } from 'react'
import { connect } from "react-redux";

import { getPost, editPost } from '../actions/post.action'

import PostForm from "./PostForm";

class PostEdit extends Component {
    
    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }

    render() {
        const { categories, editPost, posts } = this.props
    
        return (
            <div>
                <h2>Edit Post: {posts.item.title}</h2>
                
                <div className="row my-4">
                    <div className="col-md-6">
                        <PostForm categories={categories} submit={editPost} post={posts.item} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        editPost: async (post) => {
            await dispatch(editPost(post))
            ownProps.history.push('/')
        },
        getPost: (id) => dispatch(getPost({id}))
    }
}

const PostEditContainer = connect(mapStateToProps, mapDispatchToProps)(PostEdit)

export default PostEditContainer