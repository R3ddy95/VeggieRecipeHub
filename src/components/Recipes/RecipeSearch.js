import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchRecipes } from '../../api';
import { setRecipes } from '../../redux/actions';
import RecipeCard from './RecipeCard';
import '../../App.css';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

function RecipeSearch() {
  // State per la query di ricerca
  const [searchQuery, setSearchQuery] = useState('');

  // Dispatcher per le azioni Redux
  const dispatch = useDispatch();
  
  // Oggetto history per la navigazione
  const history = useHistory();
  
  // Array di ricette dallo stato Redux
  const recipes = useSelector(state => state.recipes);

  // State per gestire gli errori
  const [error, setError] = useState('');

  // Funzione di gestione della ricerca
  const handleSearch = async () => {
    try {
      // Esegue la ricerca delle ricette
      const recipes = await searchRecipes(searchQuery, { diet: 'vegetarian' });

      // Verifica se sono state trovate ricette
      if (recipes.length === 0) {
        setError('No recipes found. Please try a different search.');
      } else {
        setError('');
        dispatch(setRecipes(recipes));
      }
    } catch (error) {
      setError('Error searching recipes. Please try again later.');
      console.error('Error searching recipes:', error);
    }
  };
  
  // Funzione per gestire il clic su una ricetta
  const handleRecipeClick = (recipeId) => {
    history.push(`/recipe/${recipeId}`);
  };

  // Limita il numero di ricette visualizzate a 9
  const displayedRecipes = recipes.slice(0, 9);

  return (
    <div>   
      <div className="header">
        <div className="header-content">
          <div className="text-center">
            <h1>Veggie Recipe Hub</h1>
          </div>
          <InputGroup className="mb-4 d-flex justify-content-center align-items-center input-group">
            <div className="col-md-4">
              <FormControl
                type="text"
                placeholder="Search for Recipe, ingredients, type of cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Evita l'invio del form
                    handleSearch();
                  }
                }}
              />
            </div>
            <Button type="button" className="btn btn-success" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </Button>
          </InputGroup>
        </div>
      </div>
      <Container>
        <Row className="mt-4">
          {error && <p className="error-message d-flex justify-content-center align-items-center">{error}</p>}
          {displayedRecipes.map(recipe => (
            <Col md={4} key={recipe.id}>
              {/* Passa la funzione di gestione del clic su una ricetta al componente RecipeCard */}
              <RecipeCard
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default RecipeSearch;