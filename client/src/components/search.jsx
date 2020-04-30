import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from '../queries';
import SearchItem from './searchItem';

class Search extends React.Component {

  state = {
    searchResults: []
  }

  handleChange = ({ searchRecipes }) => {
    this.setState({ searchResults: searchRecipes })
    console.log(searchRecipes)
  }

  render() {
    return (
      <ApolloConsumer>
        { client => {
          return (
            <div className="App"> 
              <input 
                type="search"
                placeholder="Search the recipes"
                onChange={ async event => {
                  event.persist()
                  const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value }
                })
                this.handleChange(data)
              }}
                />
              <ul>
                { this.state.searchResults.map( recipe => {
                  return (
                    <SearchItem { ...recipe } key={recipe._id}/>
                )
                }) 
                }
              </ul>
            </div>
          )
        }}
        
      </ApolloConsumer>
    )
  }
  
}

export default Search