import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { searchRecipesByIngredients, getRecipeDetails } from '../services/recipeService';

const RecipeSection = ({ pantryItems, selectedCuisines, isBrowsing, onBack }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchRecipes = useCallback(async (isInitial = false) => {
        try {
            if (isInitial) {
                setLoading(true);
                setError(null);
                setOffset(0);
            }
            
            const { recipes: newRecipes, totalResults } = await searchRecipesByIngredients(
                pantryItems,
                selectedCuisines,
                isInitial ? 0 : offset
            );

            if (isInitial) {
                setRecipes(newRecipes);
            } else {
                setRecipes(prev => [...prev, ...newRecipes]);
            }
            
            setHasMore((isInitial ? newRecipes.length : recipes.length + newRecipes.length) < totalResults);
            setOffset(prev => prev + 5);
        } catch (err) {
            console.error('Error fetching recipes:', err);
            setError(err.message || 'Failed to fetch recipes. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [pantryItems, selectedCuisines, offset, recipes.length]);

    useEffect(() => {
        if (isBrowsing) {
            fetchRecipes(true);
        }
    }, [isBrowsing, selectedCuisines, fetchRecipes]);

    const handleScroll = useCallback((e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading && hasMore) {
            fetchRecipes();
        }
    }, [loading, hasMore, fetchRecipes]);

    const filteredRecipes = useMemo(() => {
        if (!searchQuery.trim()) {
            return recipes;
        }
        const query = searchQuery.toLowerCase().trim();
        return recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query) ||
            recipe.ingredients?.some(ingredient => 
                ingredient.toLowerCase().includes(query)
            ) ||
            recipe.extendedIngredients?.some(ingredient => 
                ingredient.original.toLowerCase().includes(query)
            )
        );
    }, [recipes, searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading && recipes.length === 0) {
        return (
            <div className="recipe-section">
                <div className="header-with-back">
                    <button onClick={onBack} className="back-button small">←</button>
                    <h2>Pantry</h2>
                </div>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="recipe-section">
                <div className="header-with-back">
                    <button onClick={onBack} className="back-button small">←</button>
                    <h2>Error</h2>
                </div>
                <div className="error-message">
                    <p>{error}</p>
                    {error.includes('API limit') ? (
                        <div className="error-suggestions">
                            <p>In the meantime, you can:</p>
                            <ul>
                                <li>Try again tomorrow</li>
                                <li>Contact support for assistance</li>
                                <li>Use the app without recipe search</li>
                            </ul>
                        </div>
                    ) : (
                        <button onClick={() => fetchRecipes(true)} className="retry-button">
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const noRecipesFound = filteredRecipes.length === 0;

    return (
        <div className="recipe-section" onScroll={handleScroll}>
            {!noRecipesFound && (
                <div className="header-with-back">
                    <button onClick={onBack} className="back-button small">←</button>
                    <h2>Pantry</h2>
                </div>
            )}
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search recipes by name or ingredients..."
                    className="search-input"
                />
            </div>
            {noRecipesFound ? (
                <div className="no-recipes">
                    {searchQuery ? (
                        <>
                            <p>No recipes found matching "{searchQuery}". Try:</p>
                            <ul>
                                <li>Using different search terms</li>
                                <li>Searching for ingredients instead of recipe names</li>
                                <li>Clearing the search to see all recipes</li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <p>No recipes found for your cuisine preferences. Try:</p>
                            <ul>
                                <li>Selecting different cuisine preferences</li>
                                <li>Adding more cuisine options</li>
                                <li>Removing some cuisine filters</li>
                            </ul>
                        </>
                    )}
                    <div className="bottom-button-container">
                        <button onClick={onBack} className="back-button full-width">← Back to Pantry</button>
                    </div>
                </div>
            ) : (
                <>
                    {filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <h3>{recipe.title}</h3>
                            <img 
                                src={recipe.image} 
                                alt={recipe.title} 
                                className="recipe-image"
                            />
                            {recipe.cuisines && recipe.cuisines.length > 0 && (
                                <div className="recipe-cuisines">
                                    {recipe.cuisines.map((cuisine, index) => (
                                        <span key={index} className="cuisine-tag">{cuisine}</span>
                                    ))}
                                </div>
                            )}
                            <h4>Ingredients:</h4>
                            <ul className="recipe-ingredients">
                                {recipe.extendedIngredients?.map((ingredient, index) => (
                                    <li key={index}>{ingredient.original}</li>
                                )) || recipe.ingredients?.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                )) || <li>No ingredients listed</li>}
                            </ul>
                            <h4>Instructions:</h4>
                            <p className="recipe-instructions">
                                {recipe.instructions || recipe.analyzedInstructions?.[0]?.steps?.map(step => step.step).join('\n') || 'No instructions available'}
                            </p>
                        </div>
                    ))}
                    {loading && <div className="loading-spinner"></div>}
                </>
            )}
        </div>
    );
};

export default RecipeSection; 