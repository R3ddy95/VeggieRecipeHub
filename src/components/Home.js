import React from 'react';
import Footer from './Footer/Footer';
import RecipeSearch from './Recipes/RecipeSearch' ;
import '../App.css';
import { Container } from 'react-bootstrap';

function Home() {

  return (
    <Container className="mt-4">
      <div className="header text-center">
        <h1>Vegetarian Recipes</h1>
      </div>
      <RecipeSearch />
      <Footer />
    </Container>
  );
}

export default Home;

