import React from 'react'
import { connect } from "react-redux";

import { createPost } from '../actions/post.action'

import PostForm from "./PostForm";

function PostCreate(props) {
    const { categories, createPost } = props

    return (
        <div>
            <h2>Create new Post</h2>
            
            <div className="row my-4">
                <div className="col-md-6">
                    <PostForm categories={categories} submit={createPost} />
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        createPost: async (post) => {
            await dispatch(createPost(post))
            ownProps.history.push('/')
        }
    }
}

const PostCreateContainer = connect(mapStateToProps, mapDispatchToProps)(PostCreate)

export default PostCreateContainer