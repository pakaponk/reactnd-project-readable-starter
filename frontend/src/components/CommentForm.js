import React, { Component } from 'react'

class CommentForm extends Component {
    
    state = {
        isEditMode: false,
        wasValidated: false,
        isSubmitting: false,
        comment: {
            author: '',
            body: '',
        }
    }

    componentDidMount() {
        const { comment } = this.props

        if (comment && Object.keys(comment).length) {
            this.setState({
                comment,
                isEditMode: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { comment } = this.props

        if (comment && Object.keys(comment).length && prevProps.comment !== comment) {
            this.setState({
                comment,
                isEditMode: true
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            comment: {
                ...this.state.comment,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        this.setState({
            wasValidated: true
        })

        if (!this.isCommentValid()) {
            return;
        }
        else {
            this.setState({
                isSubmitting: true
            })

            try {
                if (this.state.isEditMode) {
                    await this.props.submit(this.state.comment)
                } else {
                    await this.props.submit(this.props.parentId, this.state.comment)
                    this.setState({
                        wasValidated: false,
                        isSubmitting: false,
                        comment: {
                            author: '',
                            body: '',
                        }
                    })
                }
            } catch(error) {
                this.setState({
                    isSubmitting: false
                })
            }
        }
    }

    isCommentValid() {
        const { comment } = this.state

        return Object.keys(comment)
            .filter(key => typeof comment[key] === 'string')
            .filter(key => !comment[key].trim())
            .length === 0
    }
    
    render() {
        const { comment, wasValidated, isSubmitting, isEditMode } = this.state

        return (
            <form className={`${ wasValidated ? 'was-validated' : ''}`} 
                onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">   
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" className="form-control" value={comment.author} onChange={this.handleChange} disabled={isEditMode} required/> 
                    <div className="invalid-feedback">Please fill your name</div>     
                </div>

                <div className="form-group">   
                    <label htmlFor="body">Body</label>
                    <textarea name="body" className="form-control" value={comment.body} onChange={this.handleChange} required/>
                    <div className="invalid-feedback">Please fill your comment</div>   
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </form>
        )
    }
}

export default CommentForm