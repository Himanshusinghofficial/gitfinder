import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login);

    }

    propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    }

    render() {
        const {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;

        const { loading } = this.props;

        if (loading) return <Spinner />

        return <Fragment>
            <Link to='/' className='btn btn-light'>Back to Search</Link>
            Hireable:{' '}
            {hireable ? <i className="fa fa-check text-sucees"></i> : <i className="fa fa-times-circle text-danger"></i>}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url}
                        className='rounded-img'
                        alt=''
                        style={{ width: '150px' }}>
                    </img>
                    <h1>{name}</h1>
                    <p>location:{location}</p>
                </div>
                <div>
                    {bio && (<Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>Visit github profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username:</strong>{login}
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company:</strong>{company}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong>website:</strong>{blog}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>
                    Followers:{followers}
                </div>
                <div className='badge badge-success'>
                    Following:{following}
                </div>
                <div className='badge badge-light'>
                    public_repos:{public_repos}
                </div>
                <div className='badge badge-dark'>
                    public_gists:{public_gists}
                </div>

            </div>

            <Repos repos={this.props.repos}>

            </Repos>
        </Fragment>
    }
}

export default User
