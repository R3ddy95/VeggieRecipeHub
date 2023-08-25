import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../../api';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Lottie from 'lottie-web';
import animationData from './LoadingLottie/Loading.json'; // Importa il tuo file JSON di animazione
import DOMPurify from 'dompurify';
import Footer from '../Footer/Footer';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeById(id);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    // Inizializza l'animazione Lottie
    if (!recipe) {
      const container = document.getElementById('lottie-container');
      if (container) {
        const anim = Lottie.loadAnimation({
          container,
          animationData, // Passa il tuo file JSON di animazione qui
          loop: true,
        });
        anim.play();
      }
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div id="lottie-container d-flex align-items-center justify-content-center" style={{ width: '200px', height: '200px' }}></div>
    );
  }

  return (
    <Container className="mt-4">
      <div className="recipe-container shadow">
      <Row>
        <Col>
        <Link to="/">
          <Button className="btn btn-secondary mt-3">
            Back
          </Button>
          </Link>
        </Col>
      </Row>
      <Row className='recipe-title'>
        <Col>
          <h1 className="text-center">{recipe.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex align-items-center justify-content-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid recipe-image rounded-5"
          />
        </Col>
      </Row>
      <Row className="mt-3 text-center recipe-icon">
        <Col>
          <p>
            <strong>Servings</strong> {recipe.servings}
          </p>
        </Col>
        <Col>
          <p>
            <strong>Price per Serving</strong> ${parseFloat(recipe.pricePerServing / 100).toFixed(2)}
          </p>
        </Col>
        <Col>
          <p>
            <strong>Ready In {recipe.readyInMinutes} Min</strong>
          </p>
        </Col>
        <Col>
          <p>
            <strong>Health Score</strong> {recipe.healthScore}/100
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            className="recipe-description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.summary),
            }}
          />
        </Col>
      </Row>
      <Row className="ingredients">
        <Col>
          <h3 className="text-center">Ingredients</h3>
          <div className="d-flex justify-content-center align-items-center">
          <ul className="recipe-ingredients list-group d-inline-block">
            {recipe.extendedIngredients.map((ingredient) => (
              <li className='list-group-item' key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          </div>
        </Col>
      </Row>
      <Row className='instructions'>
        <Col>
          <h3 className="text-center">Instructions</h3>
          <div
            className="recipe-instructions"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          />
        </Col>
      </Row>
      </div>
      <Footer />
    </Container>
  );
}

export default RecipeDetail;

