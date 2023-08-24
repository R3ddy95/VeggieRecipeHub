import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../api';
import { Container, Row, Col } from 'react-bootstrap';

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
      <Row>
        <Col>
          <h1 className="text-center">Recipe Details</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/" className="btn btn-secondary mt-3">Back</Link>
        </Col>
      </Row>
      <Row className="recipe-detail">
        <Col md={6}>
          <h2 className="recipe-title">{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} className="img-fluid recipe-image" />
          <div className="recipe-info">
            <p><strong>Ready In:</strong> {recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
          </div>
        </Col>
        <Col md={6}>
          <div className="recipe-instructions">
            <h3>Instructions</h3>
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeDetail;
