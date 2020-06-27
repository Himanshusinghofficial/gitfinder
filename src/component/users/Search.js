import React, { Component } from 'react';
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        SearchUser: PropTypes.func.isRequired,
        ClearUser: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Please enter something', 'light');
            return;

        } else {
            this.props.SearchUser(this.state.text);
            this.setState({ text: '' })
        }
        this.props.SearchUser(this.state.text)
        this.setState({ text: '' });

    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="seach users.." value={this.state.text} onChange={this.onChange}></input>
                    <input type="submit" value="search" className="btn btn-dark btn-block"></input>
                </form>
                {this.props.showClear &&
                    <button className="btn btn-light btn-block " onClick={this.props.ClearUser}>Clear</button>
                }
            </div>
        )
    }
}

export default Search
