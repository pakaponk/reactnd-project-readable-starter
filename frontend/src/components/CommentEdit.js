import React, { Component } from 'react'
import { connect } from "react-redux";

import { getComment, editComment } from '../actions/comment.action'

import CommentForm from "./CommentForm";

class CommentEdit extends Component {
    
    componentDidMount() {
        this.props.getComment(this.props.match.params.id)
        .catch(action => {
            if (action.error.message === "Not Found") {
                this.props.history.push('/')
            }
        })
    }

    render() {
        const { editComment, comments } = this.props
    
        return (
            <div>
                <h2>Edit Comment</h2>
                
                <div className="row my-4">
                    <div className="col-md-6">
                        <CommentForm submit={editComment} comment={comments.item} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        editComment: async (comment) => {
            await dispatch(editComment(comment))
            ownProps.history.push('/')
        },
        getComment: (id) => dispatch(getComment({id}))
    }
}

const CommentEditContainer = connect(mapStateToProps, mapDispatchToProps)(CommentEdit)

export default CommentEditContainer