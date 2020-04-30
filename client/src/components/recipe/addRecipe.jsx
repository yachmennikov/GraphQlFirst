import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';
import Error from '../error';
import { withRouter } from 'react-router-dom';

const initialState = {
  name: '',
  category: 'Breakfest',
  description: '',
  instructions: '',
  username: ''
}

class AddRecipe extends React.Component {

  state = { ...initialState }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then( ({data}) => {
      console.log(data)
      this.setState({ ...initialState })
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { name, category, description, instructions, username } = this.state;
    const isInvalid = !name || !category || !description || !instructions || !username;
    return isInvalid
  }

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [ addRecipe, ...getAllRecipes ]
      }
    })
  }

  componentDidMount() {
    this.setState({ username: this.props.session.getCurrentUser.username })
  }

  render () {

    const { name, category, description, instructions, username } = this.state;

    return(

      <Mutation 
        mutation={ ADD_RECIPE }
        variables={{ name, category, description, instructions, username }}
        update={ this.updateCache }
      >
        { (addRecipe, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>
          return (
          <div className="App">
            <h2 className="App">Add recipe</h2>
            <form onSubmit={ event => this.handleSubmit(event, addRecipe) }>
              <input 
                type="text" 
                name="name" 
                placeholder="recipe name"
                onChange={ this.handleChange }
                value={ name }
              />
              <select 
                name="category"
                onChange={ this.handleChange }
                value={ category }
              >
                <option value="Breakfest">Breakfest</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
              <input 
                type="text" 
                name="description" 
                placeholder="describe the recipe"
                onChange={ this.handleChange }
                value={ description }
              />
              <textarea 
                name="instructions" 
                cols="15" 
                rows="10"
                placeholder="add instructions"
                onChange={ this.handleChange }
                value={ instructions }
              ></textarea>
              <button 
                type="submit"
                className="button-primary"
                disabled={ loading || this.validateForm() }
              >Submit</button>
              { error && <Error error={error} /> }
            </form>
          </div>
          )
        }}
      </Mutation>
      
    )
  }
  
  }

export default withRouter(AddRecipe)