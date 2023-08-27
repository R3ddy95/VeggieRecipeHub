import React from 'react';
import Footer from './Footer/Footer';
import RecipeSearch from './Recipes/RecipeSearch';
import RecipeSlider from './Recipes/RecipeSlider';
import '../App.css';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <>
      {/* Componente per la ricerca delle ricette */}
      <RecipeSearch />

      {/* Contenitore per il componente dello slider e il footer */}
      <Container>
        {/* Componente per lo slider delle ricette in primo piano */}
        <RecipeSlider />

        {/* Componente per il footer */}
        <Footer />
      </Container>
    </>
  );
}

export default Home;