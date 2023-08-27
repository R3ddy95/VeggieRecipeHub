import React, { useState, useEffect } from 'react';
import { getRandomRecipes } from '../../api';
import { Carousel, Container } from 'react-bootstrap'; // Importa i componenti Carousel e Container da react-bootstrap
import { Link } from 'react-router-dom'; // Importa il componente Link per la navigazione
import placeholderImage from '../../images/Placeholder.png'; // Importa l'immagine del Placeholder se l'immagine reale non è disponibile

function RecipeSlider() {
  // Stato per memorizzare le ricette casuali
  const [recipes, setRecipes] = useState([]);

  // Effettua una chiamata API all'avvio del componente per ottenere ricette casuali
  useEffect(() => {
    getRandomRecipes(7) // Ottiene 7 ricette casuali
      .then(recipes => setRecipes(recipes)) // Aggiorna lo stato con le ricette ottenute
      .catch(error => console.error('Error fetching random recipes:', error));
  }, []);

  return (
    <Container className="recipe-slider d-flex justify-content-center align-items-center">
      <div className="slider">
        <h2 className="text-center mb-4">Featured Recipes</h2>
        {/* Utilizza il componente Carousel di react-bootstrap per mostrare le ricette */}
        <Carousel interval={8000} pause="hover"> {/* Imposta l'intervallo tra le slide e la pausa su hover */}
          {recipes.map(recipe => (
            <Carousel.Item key={recipe.id}>
              {/* Utilizza il componente Link per reindirizzare all'URL corretto */}
              <Link to={`/recipe/${recipe.id}`}>
                <img
                  className="d-block w-100"
                  src={recipe.image || placeholderImage}
                  alt={recipe.title}
                />
                {/* Mostra il titolo della ricetta come caption */}
                <Carousel.Caption>
                  <h3>{recipe.title}</h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}

export default RecipeSlider;
