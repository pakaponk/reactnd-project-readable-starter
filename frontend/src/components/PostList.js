import React from 'react'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

import PostListItem from './PostListItem'

function PostList(props){
    const { items } = props.posts || [];

    const posts = items.filter( post => !post.deleted)

    return (
        <div className="pt-3">
            <div className="d-flex align-items-center py-3">
                <h5 className="mt-1">Sort by</h5>
                <div className="col-auto">
                    <select name="sortBy" className="form-control">
                        <option value="1">Newest</option>
                        <option value="2">Oldest</option>
                        <option value="3">Highest Score</option>
                        <option value="4">Lowest Score</option>
                    </select>
                </div>
                <div className="ml-auto">
                    <Link to="/posts/create" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" /> Create new Post
                    </Link>
                </div>  
            </div>
            { posts.length > 0 ? 
                posts.map(post => <PostListItem key={post.id} post={post} compact />) : 
                <div className="p-5 bg-light text-center rounded">
                    <h3 className="text-muted">Do not found any Posts</h3>
                </div>
            }
        </div>
    )
}

export default PostList