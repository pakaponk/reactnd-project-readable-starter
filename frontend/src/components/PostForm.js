import React, { Component } from 'react'

class PostForm extends Component {
    
    state = {
        isEditMode: false,
        wasValidated: false,
        isSubmitting: false,
        post: {
            title: '',
            body: '',
            author: '',
            category: ''
        }
    }

    componentDidMount() {
        const { post } = this.props

        if (post && Object.keys(post).length) {
            this.setState({
                post,
                isEditMode: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { post } = this.props

        if (post && Object.keys(post).length && !Object.is(prevProps.post, post)) {
            this.setState({
                post,
                isEditMode: true
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        this.setState({
            wasValidated: true
        })

        if (!this.isPostValid()) {
            return;
        }
        else {
            this.setState({
                isSubmitting: true
            })

            this.props.submit(this.state.post)
        }
    }

    isPostValid() {
        const { post } = this.state

        return Object.keys(post)
            .filter(key => typeof post[key] === 'string')
            .filter(key => !post[key].trim()).length === 0
    }

    render() {
        const { post, wasValidated, isSubmitting, isEditMode } = this.state
        const categories = this.props.categories.items

        return (
            <form className={`${ wasValidated ? 'was-validated' : ''}`} 
                onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">   
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" value={post.title} onChange={this.handleChange} required/>
                    <div className="invalid-feedback">Please fill the title of your post</div>  
                </div>

                <div className="form-group">   
                    <label htmlFor="body">Body</label>
                    <textarea name="body" className="form-control" value={post.body} onChange={this.handleChange} required/>
                    <div className="invalid-feedback">Please fill the body of your post</div>   
                </div>

                <div className="form-group">   
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" className="form-control" value={post.author} onChange={this.handleChange} required disabled={isEditMode}/> 
                    <div className="invalid-feedback">Please fill your name</div>     
                </div>

                <div className="form-group">   
                    <label htmlFor="category">Category</label>
                    <select name="category" className="form-control" value={post.category} onChange={this.handleChange} required disabled={isEditMode}>
                        { !post.category ? <option value="">Please select Category</option> : '' }
                        { 
                            categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))
                        }
                    </select>
                    <div className="invalid-feedback">Please select one Category</div>  
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </form>
        )
    }
}

export default PostForm