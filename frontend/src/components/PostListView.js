import React, { Component } from 'react'
import { connect } from 'react-redux';

import PostList from './PostList'

import { fetchPosts } from '../actions/post.action'

class PostListView extends Component {
    
    componentDidMount() {
        const { category } = this.props
        
        this.props.dispatch(fetchPosts({
            category
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        const { category } = this.props
        if (category !== prevProps.category) {
            this.props.dispatch(fetchPosts({
                category
            }))
        }
    }
    
    render() {
        const { category } = this.props

        const title = category ? category.slice(0,1).toUpperCase() + category.slice(1) : "All Posts"

        return (
            <div>
                <h2>{title}</h2>

                <PostList posts={this.props.posts} />          
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
    }
}

const PostListViewContainer = connect(mapStateToProps)(PostListView)

export default PostListViewContainer