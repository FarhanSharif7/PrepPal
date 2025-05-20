import React, { useState } from 'react';

const PantrySection = ({ onNext, onBrowse }) => {
    const [pantryItems, setPantryItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [selectedCuisines, setSelectedCuisines] = useState([]);

    const cuisines = [
        { id: 'italian', label: 'Italian' },
        { id: 'mexican', label: 'Mexican' },
        { id: 'indian', label: 'Indian' },
        { id: 'mediterranean', label: 'Mediterranean' },
        { id: 'chinese', label: 'Chinese' },
        { id: 'japanese', label: 'Japanese' },
        { id: 'thai', label: 'Thai' },
        { id: 'american', label: 'American' }
    ];

    const addIngredient = () => {
        const trimmedItem = newItem.trim();
        if (trimmedItem && !pantryItems.includes(trimmedItem)) {
            setPantryItems([...pantryItems, trimmedItem]);
            setNewItem('');
        }
    };

    const removeIngredient = (index) => {
        setPantryItems(pantryItems.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    };

    const handleCuisineChange = (cuisineId) => {
        setSelectedCuisines(prev => 
            prev.includes(cuisineId)
                ? prev.filter(id => id !== cuisineId)
                : [...prev, cuisineId]
        );
    };

    const handleNext = () => {
        onNext(pantryItems, selectedCuisines);
    };

    const handleBrowse = () => {
        onBrowse(selectedCuisines);
    };

    return (
        <div className="pantry-section">
            <h2>My Pantry</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add an ingredient..."
                />
                <button onClick={addIngredient} className="primary">Add</button>
            </div>
            
            <div className="cuisine-preferences">
                <h3>Cuisine Preferences</h3>
                <div className="cuisine-checkboxes">
                    {cuisines.map(cuisine => (
                        <label key={cuisine.id} className="cuisine-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedCuisines.includes(cuisine.id)}
                                onChange={() => handleCuisineChange(cuisine.id)}
                            />
                            {cuisine.label}
                        </label>
                    ))}
                </div>
                <button 
                    onClick={handleBrowse}
                    className="browse-button"
                    disabled={selectedCuisines.length === 0}
                >
                    Browse Recipes
                </button>
                {selectedCuisines.length === 0 && (
                    <p className="browse-hint">Please select at least one cuisine to browse recipes</p>
                )}
            </div>

            <ul className="pantry-list">
                {pantryItems.map((item, index) => (
                    <li key={index} className="pantry-item">
                        {item}
                        <button 
                            onClick={() => removeIngredient(index)}
                            className="danger"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            
            <button 
                onClick={handleNext}
                disabled={pantryItems.length === 0}
                className="primary"
            >
                Next
            </button>
        </div>
    );
};

export default PantrySection; 