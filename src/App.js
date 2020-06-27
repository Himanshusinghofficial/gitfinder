import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import User from './component/users/User'
import Search from './component/users/Search';
import Home from './component/pages/Home'
import Alert from './component/layout/Alert';
import About from './component/pages/About';
import axios from 'axios'
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,

  }

  // async componentDidMount() {

  //   this.setState({ loading: true })
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_NOT_CLIENT_ID}&client_secret=${process.env.REACT_APP_NOT_CLIENT_SECRET}`)
  //   this.setState({ users: res.data, loading: false })
  // }

  //search github users
  SearchUser = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_NOT_CLIENT_ID}&client_secret=${process.env.REACT_APP_NOT_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false })

  }

  //get single user
  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_NOT_CLIENT_ID}&client_secret=${process.env.REACT_APP_NOT_CLIENT_SECRET}`)
    this.setState({ user: res.data, loading: false })

  }

  //get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_NOT_CLIENT_ID}&client_secret=${process.env.REACT_APP_NOT_CLIENT_SECRET}`)
    this.setState({ repos: res.data, loading: false })

  }


  ClearUser = () => {
    this.setState({ users: [], loading: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}></Alert>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search SearchUser={this.SearchUser} ClearUser={this.ClearUser} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={this.state.loading} users={this.state.users} />

                </Fragment>
              )}></Route>

              <Route exact path='/gitfinder' render={props => (
                <Fragment>
                  <Search SearchUser={this.SearchUser} ClearUser={this.ClearUser} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={this.state.loading} users={this.state.users} />

                </Fragment>
              )}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.props.loading}></User>
              )}></Route>
              <Route component={Home}>
              </Route>
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
