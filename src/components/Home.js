import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchRecipes } from '../api';
import { setRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';
import '../App.css';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector(state => state.recipes);

  const handleSearch = async () => {
    try {
      const recipes = await searchRecipes(searchQuery, { diet: 'vegetarian' });
      dispatch(setRecipes(recipes));
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const handleRecipeClick = (recipeId) => {
    history.push(`/recipe/${recipeId}`);
  };

  return (
    <Container className="mt-4">
      <div className="header text-center">
        <h1>Vegetarian Recipes</h1>
      </div>
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          placeholder="Search for Recipe, ingredients, equipments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </InputGroup>
      <Row>
        {recipes.map(recipe => (
          <Col md={4} key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe.id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;