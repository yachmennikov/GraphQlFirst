import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import withSession from './components/withSession';
import Navbar from './components/navbar';
import Search from './components/search';
import Profile from './components/profile/profile';
import AddRecipe from './components/recipe/addRecipe';
import RecipePage from './components/recipe/recipePage';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError)
    }
  }
})

const Root = ({ refetch, session }) => {
  return (
    <>
      <Router>
        <Navbar session={session}/>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/search" component={Search} />
          <Route path="/signin" render={() => <Signin refetch={refetch} />} />
          <Route path="/signup" render={() => <Signup refetch={refetch} />}  />
          <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
          <Route path="/recipes/:_id" component={RecipePage} />
          <Route path="/profile" render={() => <Profile session={session} />} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  )
}

const RootWithSession = withSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
