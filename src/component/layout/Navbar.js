import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Navbar extends Component {
  static defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github',
  };

  PropTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <nav className='navbar bg-primary'>
          <h1>
            <i className={this.props.icon} /> {this.props.title}
          </h1>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>about</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
