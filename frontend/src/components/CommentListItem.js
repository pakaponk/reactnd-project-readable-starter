import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp'
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

import { deleteComment, voteComment } from '../actions/comment.action'

class CommentListItem extends Component {
    
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
                await this.props.vote(this.props.comment.id, isUpVote)
            }
            finally {
                this.setState({
                    isVoting: false
                })
            }
        }
    }
    
    render() {
        const { comment } = this.props 

        return (
            <div className="d-flex bg-light p-3 mb-3" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div> 
                    <p>{comment.body}</p>    
                    <span className="text-muted">by {comment.author}</span> 
                    <span className="pl-3">
                        <FontAwesomeIcon icon={ comment.voteScore >= 0 ? faThumbsUp : faThumbsDown } /> {comment.voteScore}
                    </span> 
                    
                    <div className="pt-3">
                        <button type="button" className="btn btn-sm btn-success mr-2" onClick={() => this.vote(true)}>
                            <FontAwesomeIcon icon={faThumbsUp} /> <span className="ml-1">Upvote</span>
                        </button>

                        <button type="button" className="btn btn-sm btn-danger" onClick={() => this.vote(false)}>
                            <FontAwesomeIcon icon={faThumbsDown} /> <span className="ml-1">Downvote</span>
                        </button>
                    </div>
                </div>
                <div className={`ml-auto ${ this.state.isHovered ? '' : 'invisible' }`}>
                    <Link className="btn btn-secondary btn-sm" to={`/comments/${comment.id}/edit`}>
                        <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                    </Link>

                    <button type="button" className="ml-2 btn btn-danger btn-sm"
                        onClick={() => this.props.delete(comment.id)}>
                        <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                    </button>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        vote: (id, isUpVote) => dispatch(voteComment({id, isUpVote})),
        delete: (id) => dispatch(deleteComment({id}))
    }
}

const CommentListItemContainer = connect(null, mapDispatchToProps)(CommentListItem)

export default CommentListItemContainer