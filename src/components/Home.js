import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchRecipes } from '../api';
import { setRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';
import '../App.css';
import { Container, Row, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null); // State per gestire gli errori
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector(state => state.recipes);

  const handleSearch = async () => {
    try {
      const recipes = await searchRecipes(searchQuery, { diet: 'vegetarian' });
      dispatch(setRecipes(recipes));
      setError(null); // Resetta l'errore se la chiamata API ha successo
    } catch (error) {
      console.error('Error searching recipes:', error);
      setError('404 An error occurred while fetching recipes. Please try again.'); // Imposta il messaggio di errore
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
      {error && <Alert variant="danger">{error}</Alert>} {/* Mostra il messaggio di errore se presente */}
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
