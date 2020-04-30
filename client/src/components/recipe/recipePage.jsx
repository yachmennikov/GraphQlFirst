import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries'

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  return (
  <Query query={GET_RECIPE} variables={{ _id }}>
    { ({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
      return (
        <div>
          <h2>{data.getRecipe.name}</h2>
          <p>{data.getRecipe.category}</p>
          <p>{data.getRecipe.description}</p>
          <p>{data.getRecipe.instructions}</p>
          <p>{data.getRecipe.likes}</p>
        </div>
      )
    }}
  </Query>
)}

export default withRouter(RecipePage)