import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Effettua una ricerca di ricette complessa
export const searchRecipes = async (query, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        ...params,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

// Ottiene i dettagli di una ricetta tramite ID
export const getRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${recipeId}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ottiene un numero specifico di ricette casuali
export const getRandomRecipes = async (number) => {
  try {
    const response = await axios.get(`${BASE_URL}/random?tags=vegetarian`, {
      params: {
        apiKey: API_KEY,
        number,
      },
    });
    return response.data.recipes;
  } catch (error) {
    throw error;
  }
};