import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchRecipes } from '../../api';
import { setRecipes } from '../../redux/actions';
import RecipeCard from './RecipeCard';
import '../../App.css';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

function RecipeSearch() {
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

  // Limiting the number of displayed recipes to 9
  const displayedRecipes = recipes.slice(0, 9);

  return (
    <Container className="mt-4">
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          placeholder="Search for Recipe, ingredients, type of cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </InputGroup>
      <Row>
        {displayedRecipes.map(recipe => (
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

export default RecipeSearch;