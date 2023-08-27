import React from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';

function RecipeCard({ recipe, onClick }) {
  // Il componente 'RecipeCard' rappresenta una singola carta per una ricetta.
  // Accetta due prop: 'recipe' (contiene i dati della ricetta) e 'onClick' (gestisce il clic sulla carta).

  return (
    <Card className="mb-4 shadow" onClick={onClick}>
      {/* L'immagine della ricetta */}
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />

      <Card.Body>
        {/* Titolo della ricetta */}
        <Card.Title className="text-center">{recipe.title}</Card.Title>
        {/* Altre informazioni sulla ricetta potrebbero essere aggiunte qui, come ad esempio la durata di preparazione, ecc. */}
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;