import React from 'react';
import '../App.css';
import { Card } from 'react-bootstrap'

function RecipeCard({ recipe, onClick }) {

  return (
    <Card className="mb-4" onClick={onClick}>
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <div className="recipe-info">
          <p><strong>Time:</strong> {recipe.readyInMinutes} minutes</p>
          <p><strong>Cost:</strong> {recipe.pricePerServing ? recipe.pricePerServing : 'N/A'}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;

