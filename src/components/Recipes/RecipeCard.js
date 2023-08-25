import React from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap'

function RecipeCard({ recipe, onClick }) {

  return (
    <Card className="mb-4 shadow" onClick={onClick}>
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      <Card.Body>
        <Card.Title className="text-center">{recipe.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;

