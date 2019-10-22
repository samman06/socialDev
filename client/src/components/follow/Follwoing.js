import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from "../common/Spinner";
import {getFollwoing,unFollowingUserPage} from "../../actions/followActions";

class Follwoing extends Component {
    componentDidMount() {
        const {auth} = this.props;
        this.props.getFollwoing(auth.user.id)
    }

    render() {
        const {following,loading} = this.props.follow;
        const {auth} = this.props;
        let followongItem;
        if (following === null || loading) {
            followongItem = <Spinner/>
        } else {
            if (following.length > 0) {
                followongItem = following.map(follow => {
                    console.log(follow);
                    return (
                        <div className="card card-body mb-3">
                            <div className="row">
                                <div className="col-md-2">
                                    <Link to="">
                                        <img
                                            className="rounded-circle d-none d-md-block"
                                            src={follow.avatar}
                                            alt=""
                                        />
                                    </Link>
                                    <br/>
                                </div>
                                <div className="col-md-10">
                                    <p className="lead">
                                        {follow.user}
                                    </p>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Link to={`/profile/${follow.handle}`} className="btn btn-lg btn-info mr-1">
                                                profile
                                            </Link>
                                        </div>
                                        <div className="col-md-4">
                                            <Link to={`/post/${follow._id}`} className="btn btn-lg btn-info mr-1">
                                                posts
                                            </Link>
                                        </div>
                                        <div className="col-md-4">
                                            <Link to={"/follwoing"} className="btn btn-lg btn-danger mr-1"
                                                  onClick={this.props.unFollowingUserPage.bind(this, auth.user.id, follow.user)}
                                            >
                                                unfollow
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                })
            } else {
                followongItem = (
                    <div>
                        no following
                    </div>
                )
            }
        }
        return (
            <div>
                {followongItem}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    follow: state.follow
})

Follwoing.propTypes = {
    auth: PropTypes.object.isRequired,
    follow: PropTypes.object.isRequired,
    getFollwoing: PropTypes.func.isRequired,
    unFollowingUserPage: PropTypes.func.isRequired
};
export default connect(
    mapStateToProps,
    {getFollwoing,unFollowingUserPage}
)(Follwoing);