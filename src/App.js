import React, { useState } from 'react';
import { ChakraProvider, Container, VStack, Heading } from '@chakra-ui/react';
import PantrySection from './components/PantrySection';
import RecipeSection from './components/RecipeSection';
import { recipes } from './data/recipes';

function App() {
  const [pantryItems, setPantryItems] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);

  const handleAddItem = (item) => {
    setPantryItems([...pantryItems, item]);
  };

  const handleRemoveItem = (index) => {
    setPantryItems(pantryItems.filter((_, i) => i !== index));
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8}>
          <Heading>PrepPal - Meal Planner</Heading>
          {!showRecipes ? (
            <PantrySection
              pantryItems={pantryItems}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onNext={() => setShowRecipes(true)}
            />
          ) : (
            <RecipeSection
              pantryItems={pantryItems}
              onBack={() => setShowRecipes(false)}
            />
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App; 