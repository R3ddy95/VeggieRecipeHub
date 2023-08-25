import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../api';
import { Container, Row, Col } from 'react-bootstrap';
import DOMPurify from 'dompurify'; // Importa la libreria

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
          <Link to="/" className="btn btn-secondary mt-3">Back</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-center">{recipe.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={recipe.image} alt={recipe.title} className="img-fluid recipe-image" />
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Utilizza DOMPurify per sanificare l'HTML */}
          <div className="recipe-description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.summary) }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Ingredients</h3>
          <ul className="recipe-ingredients">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Instructions</h3>
          <div className="recipe-instructions" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeDetail;
