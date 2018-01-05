import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

import PostListItem from './PostListItem'

class PostList extends Component{

    state = {
        sortBy: 0
    }

    handleSortByChanged = (event) => {
        this.setState({
            sortBy: parseInt(event.target.value, 10)
        })
    }

    render() {
        const { items } = this.props.posts || [];
        const posts = items.filter( post => !post.deleted).sort((curr, next) => {
            switch(this.state.sortBy) {
                case 1:
                    return (curr.timestamp - next.timestamp) * -1;
                case 2:
                    return (curr.timestamp - next.timestamp);
                case 3:
                    return (curr.voteScore - next.voteScore) * -1;
                case 4:
                    return (curr.voteScore - next.voteScore);
                default:
                    return -1;
            }
        })
    
        return (
            <div className="pt-3">
                <div className="d-flex align-items-center py-3">
                    <h5 className="mt-1">Sort by</h5>
                    <div className="col-auto">
                        <select name="sortBy" className="form-control" onChange={this.handleSortByChanged}>
                            <option value="0">Default</option>
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
}

export default PostList