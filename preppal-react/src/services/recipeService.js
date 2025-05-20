import { API_KEY, API_BASE_URL } from '../config/api';

export const searchRecipesByIngredients = async (ingredients, cuisines = [], offset = 0) => {
    try {
        // If no ingredients are provided, use a default search
        const ingredientsParam = ingredients.length > 0 
            ? `&includeIngredients=${ingredients.join(',')}`
            : '';
        
        // Handle cuisine parameter
        const cuisineParam = cuisines.length > 0 
            ? `&cuisine=${cuisines.join(',')}`
            : '';

        const response = await fetch(
            `${API_BASE_URL}/complexSearch?apiKey=${API_KEY}${ingredientsParam}${cuisineParam}&number=5&offset=${offset}&addRecipeInformation=true`
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.results) {
            console.warn('No results found in API response:', data);
            return { recipes: [], totalResults: 0 };
        }

        return {
            recipes: data.results || [],
            totalResults: data.totalResults || 0
        };
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const getRecipeDetails = async (recipeId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
}; 