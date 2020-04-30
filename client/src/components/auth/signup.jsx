import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../error';
import { withRouter } from 'react-router-dom';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordComfirmation: ''
}

class Signup extends React.Component {

  state = { ...initialState }

  clearState = () => {
    this.setState({ ...initialState })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then( async ({ data }) => {
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/')
    })
  }

  validateForm() {
    const { username, email, password, passwordComfirmation } = this.state;
    const invalid = !username || !email || !password || !passwordComfirmation || password !== passwordComfirmation;
    return invalid;
  }

  render() {

    const { username, email, password, passwordComfirmation } = this.state;

    return (
      <div className="App">
        <h2 className="App">Sign Up</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {(signupUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={ event => this.handleSubmit(event, signupUser) }>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={ this.handleChange }
              value={ username }
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail address"
              onChange={ this.handleChange }
              value={ email }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={ this.handleChange }
              value={ password }
            />
            <input
              type="password"
              name="passwordComfirmation"
              placeholder="Password Comfirmation"
              onChange={ this.handleChange }
              value={ passwordComfirmation }
            />
            <button 
              type="submit" 
              className="button-primary"
              disabled={ loading || this.validateForm() }
            >Send</button>
            { error && <Error error={error}></Error> }
          </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(Signup)