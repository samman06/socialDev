import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {addComment} from "../../actions/postActions";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {user} = this.props.auth;
        const {postId} = this.props;
        const newComment = {
            user: user.id,
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
        };
        this.props.addComment(postId, newComment);
        this.setState({text: ''})
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="post-form mb-1">
                <div className="card card-info">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Replay to post..."
                                    onChange={this.onChange}
                                    name="text"
                                    value={this.state.text}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {addComment}
)(CommentForm);