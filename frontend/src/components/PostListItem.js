import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp'
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown'
import faComments from '@fortawesome/fontawesome-free-solid/faComments'
import faInfo from '@fortawesome/fontawesome-free-solid/faInfoCircle'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

import { votePost, deletePost } from '../actions/post.action'

class PostListItem extends Component {

    state = {
        isVoting: false,
        isHovered: false
    }

    onMouseEnter = () => {
        this.setState({
            isHovered: true
        })
    }

    onMouseLeave = () => {
        this.setState({
            isHovered: false
        })
    }

    vote = async (isUpVote) => {
        if (!this.state.isVoting)
        {
            try {
                this.setState({
                    isVoting: true
                })
                await this.props.vote(this.props.post.id, isUpVote)
            }
            finally {
                this.setState({
                    isVoting: false
                })
            }
        }
    }

    render() {
        const post = this.props.post
    
        return (
            <div className="d-flex p-3 mb-3 bg-light rounded" 
                onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div>
                    <h4>{post.title}</h4>
                    <span className="text-muted">by {post.author}</span>
                    <span className="pl-3">
                        <FontAwesomeIcon icon={ post.voteScore > 0 ? faThumbsUp : faThumbsDown } /> {post.voteScore}
                    </span> 
                    <span className="pl-3">
                        <FontAwesomeIcon icon={ faComments } /> {post.commentCount}
                    </span>
        
                    <div className="mt-3">
                        <button type="button" className="btn btn-info">
                            <FontAwesomeIcon icon={faInfo} className="mr-1" /> View
                        </button>
        
                        <button type="button" className="ml-2 btn btn-success" 
                            onClick={() => this.vote(true)} 
                            disabled={this.state.isVoting}>
                            <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> Upvote
                        </button>
        
                        <button type="button" className="ml-2 btn btn-danger" 
                            onClick={() => this.vote(false)}
                            disabled={this.state.isVoting}>
                            <FontAwesomeIcon icon={faThumbsDown} className="mr-1" /> Downvote
                        </button>     
                    </div>  
                </div>
                
                <div className={`ml-auto ${ this.state.isHovered ? '' : 'invisible' }`}>
                    <Link className="btn btn-secondary" to={`/posts/${post.id}/edit`}>
                        <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                    </Link>

                    <button type="button" className="ml-2 btn btn-danger"
                        onClick={() => this.props.delete(post.id)}>
                        <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                    </button>
                </div>
            </div> 
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        vote: (id, isUpVote) => dispatch(votePost(id, isUpVote)),
        delete: (id) => dispatch(deletePost(id))
    }
}

const PostListItemContainer = connect(null, mapDispatchToProps)(PostListItem)

export default PostListItemContainer