import React, { useState } from 'react';
import PantrySection from './components/PantrySection';
import RecipeSection from './components/RecipeSection';
import './App.css';

function App() {
  const [showRecipes, setShowRecipes] = useState(false);
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [isBrowsing, setIsBrowsing] = useState(false);

  const handleNext = (items, cuisines) => {
    setPantryItems(items);
    setSelectedCuisines(cuisines);
    setIsBrowsing(false);
    setShowRecipes(true);
  };

  const handleBrowse = (cuisines) => {
    setSelectedCuisines(cuisines);
    setPantryItems([]);
    setIsBrowsing(true);
    setShowRecipes(true);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>PrepPal</h1>
        {!showRecipes ? (
          <PantrySection 
            onNext={handleNext}
            onBrowse={handleBrowse}
          />
        ) : (
          <RecipeSection 
            pantryItems={pantryItems} 
            selectedCuisines={selectedCuisines}
            isBrowsing={isBrowsing}
            onBack={() => setShowRecipes(false)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
