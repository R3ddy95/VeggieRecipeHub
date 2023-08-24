import axios from 'axios';

const API_KEY = '21808ee291ff4f90ad8bdf2dafaa8e58';
const BASE_URL = 'https://api.spoonacular.com/recipes';

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
