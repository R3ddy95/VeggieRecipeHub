import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../api';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import Footer from './Footer';

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

  if (!recipe) {
    return <div>Loading...</div>;
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
            <strong>Price per Serving</strong> {recipe.pricePerServing}
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
          <ul className="recipe-ingredients list-group">
            {recipe.extendedIngredients.map((ingredient) => (
              <li className='list-group-item' key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
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

